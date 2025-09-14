import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export default function Notes({ token, user, onLogout }) {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  // edit state
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [selectedNOte, setSelectedNote] = useState(null);

  const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: { Authorization: `${token}` },
  });

  const fetchNotes = async () => {
    try {
      const res = await axiosInstance.get("/notes");
      setNotes(res.data);
    } catch {
      setError("Failed to load notes");
    }
  };

  const fetchNoteById = async (id) => {
    try {
      const res = await axiosInstance.get(`/notes/${id}`);
      setSelectedNote(res.data);
    } catch (err) {
      setError(err.message || "Could not fetch note");
    }
  };

  const addNote = async () => {
    if (!title.trim() || !content.trim()) {
      setError("Both title and content are required");
      return;
    }
    try {
      const res = await axiosInstance.post("/notes", { title, content });
      setTitle("");
      setContent("");
      setNotes((prev) => [...prev, res.data]);
    } catch (err) {
      setError(err.response?.data?.message || "Could not add note");
    }
  };

  const deleteNote = async (id) => {
    try {
      await axiosInstance.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter((n) => n._id !== id));
    } catch {
      setError("Failed to delete note");
    }
  };

  const updateNote = async (id, updatedFields) => {
    try {
      const res = await axiosInstance.put(`/notes/${id}`, updatedFields);
      setNotes((prev) => prev.map((n) => (n._id === id ? res.data : n)));
      setEditingId(null);
    } catch (err) {
      setError(err.response?.data?.message || "Could not update note");
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 ml-44">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4 ">
          <div className="flex justify-between items-center ">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Notes</h1>
              <p className="text-sm text-gray-600 mt-1">{user.tenant}</p>
            </div>
            <button
              onClick={onLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 shadow-sm"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 text-sm font-medium">{error}</p>
          </div>
        )}

        {/* Create Note Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Create New Note
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                placeholder="Enter note title..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content
              </label>
              <textarea
                placeholder="Write your note content here..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 resize-none text-gray-900 placeholder-gray-500"
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>

            <button
              onClick={addNote}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 shadow-sm"
            >
              Add Note
            </button>
          </div>
        </div>

        {/* Notes Grid */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-900">
            Your Notes ({notes.length})
          </h3>

          {notes.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
              <div className="text-gray-400 text-5xl mb-4">📝</div>
              <p className="text-gray-600 font-medium">No notes yet</p>
              <p className="text-gray-500 text-sm mt-1">
                Create your first note above!
              </p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {notes.map((note) => (
                <div
                  key={note._id}
                  onClick={() => fetchNoteById(note._id)}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow duration-200 cursor-pointer"
                >
                  {editingId === note._id ? (
                    <div>
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="w-full mb-2 px-3 py-2 border rounded"
                      />
                      <textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        className="w-full mb-2 px-3 py-2 border rounded"
                        rows={3}
                      />
                      <div className="flex space-x-2">
                        <button
                          onClick={() =>
                            updateNote(note._id, {
                              title: editTitle,
                              content: editContent,
                            })
                          }
                          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 rounded"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-semibold text-gray-900 text-lg leading-tight">
                          {note.title}
                        </h4>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => {
                              setEditingId(note._id);
                              setEditTitle(note.title);
                              setEditContent(note.content);
                            }}
                            className="text-gray-400 hover:text-blue-600 p-1"
                            title="Edit note"
                          >
                            ✏️
                          </button>
                          <button
                            onClick={() => deleteNote(note._id)}
                            className="text-gray-400 hover:text-red-600 p-1"
                            title="Delete note"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {note.content}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Upgrade Banner */}
        {notes.length >= 3 && user?.plan === "free" && (
          <div className="mt-8 bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-xl p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-yellow-800"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <div className="ml-4 flex-1">
                <h4 className="text-yellow-800 font-semibold">
                  Free Plan Limit Reached
                </h4>
                <p className="text-yellow-700 text-sm mt-1">
                  You've reached the maximum of 3 notes on the free plan.
                </p>
              </div>
              <button
                onClick={async () => {
                  try {
                    await axiosInstance.post(`/tenants/${user.tenant}/upgrade`);
                    alert("Tenant upgraded to Pro!");
                    const updateUser = { ...user, plan: "pro" };
                    localStorage.setItem("user", JSON.stringify(updateUser));
                    fetchNotes();
                  } catch (err) {
                    alert(err.response?.data?.message || "Upgrade failed");
                  }
                }}
                className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 shadow-sm"
              >
                Upgrade to Pro
              </button>
            </div>
          </div>
        )}

        {selectedNOte && (
          <div className="fixed rounded-xl top-28 left-7 w-1/4 h-[550px] bg-white border-l shadow-lg p-6 overflow-y-auto border-4 border-black">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                {selectedNOte.title}
              </h2>
              <button
                onClick={() => setSelectedNote(null)}
                className="text-gray-400 hover:text-red-600"
              >
                ✖
              </button>
            </div>

            {/* Editable inputs */}
            <div className="space-y-4">
              <input
                type="text"
                className="w-full px-3 py-2 border rounded border-black"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
              <textarea
                className="w-full px-3 py-2 border rounded resize-none border-black"
                rows={8}
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
              />
              <div className="flex space-x-2">
                <button
                  onClick={async () => {
                    try {
                      const res = await updateNote(selectedNOte._id, {
                        title: editTitle,
                        content: editContent,
                      });
                      setSelectedNote(res); // update panel with latest note
                    } catch {}
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setEditTitle(selectedNOte.title);
                    setEditContent(selectedNOte.content);
                  }}
                  className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
