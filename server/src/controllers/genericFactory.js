const createFactory = (Model) => ({
  list: async (req, res, next) => {
    try {
      const data = await Model.find(req.query).sort({ createdAt: -1 });
      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  },
  create: async (req, res, next) => {
    try {
      const item = await Model.create(req.body);
      res.status(201).json({ message: 'Created successfully', data: item });
    } catch (error) {
      next(error);
    }
  },
  update: async (req, res, next) => {
    try {
      const item = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!item) return res.status(404).json({ message: 'Record not found' });
      res.status(200).json({ message: 'Updated successfully', data: item });
    } catch (error) {
      next(error);
    }
  },
  remove: async (req, res, next) => {
    try {
      const item = await Model.findByIdAndDelete(req.params.id);
      if (!item) return res.status(404).json({ message: 'Record not found' });
      res.status(200).json({ message: 'Deleted successfully' });
    } catch (error) {
      next(error);
    }
  }
});

module.exports = createFactory;
