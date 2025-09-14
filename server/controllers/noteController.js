import Note from "../models/Notes.js";
import Tenant from "../models/tenant.js";

//Create a note
export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const tenantId = req.user.tenantId;

    //check free plan limit
    const tenant = await Tenant.findById(tenantId);
    console.log(tenant.plan);
    if (tenant.plan === "free") {
      //count number of notes for this tenant
      const noteCount = await Note.countDocuments({ tenantId });
      if (noteCount >= 3) {
        return res
          .status(403)
          .json({ message: "Free plan limit reached. Upgrade to Pro. " });
      }
    }
    const note = await Note.create({
      title,
      content,
      tenantId,
      userId: req.user.userId,
    });

    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//Get all notes
export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ tenantId: req.user.tenantId }); //prevent conflict of notes and make sure the same company gets the desired notes.
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//getNotes by Id
export const getNoteById = async(req,res) => {
  try{
    const note = await Note.findOne({_id:req.params.id, tenantId:req.user.tenantId});
    if(!note)return res.status(404).json({message : "Note not found"});
    res.json(note);
  }catch(err) {
    res.status(500).json({message:err.message});
  }
}

//Update note
export const updateNote = async (req, res) => {
  try {
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, tenantId: req.user.tenantId },
      req.body,
      { new: true }
    );
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.json(note);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//Delete note
export const deleteNote = async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      tenantId: req.user.tenantId,
    });
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.json(note);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
