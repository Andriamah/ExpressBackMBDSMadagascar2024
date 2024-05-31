const Assignment = require('../model/Assignment');

class AssignmentService {
  async getAssignments() {
    try {
      const assignments = await Assignment.find();
      console.log(assignments);
      return assignments;
    } catch (err) {
      throw err;
    }
  }

  async getAssignmentByMatierer(id) {
    try {
      const assignments = await Assignment.find({ id_matiere: id });
      console.log("assignment by matiere service: ");
      console.log(assignments);
      return assignments;
    } catch (err) {
      throw err;
    }
  }

  async getAssignmentById(id) {
    try {
      const assignments = await Assignment.findOne({ _id: id });
      console.log("assignment by Id service: ");
      console.log(assignments);
      return assignments;
    } catch (err) {
      throw err;
    }
  }

  async deleteAssignmentById(id) {
    try {
      const assignment = await Assignment.findByIdAndDelete(id);
      if (assignment) {
        console.log("Deleted Assignment id: ", id);
      } else {
        console.log("Assignment not found with id: ", id);
      }
    } catch (err) {
      console.error("Error deleting assignment: ", err);
      throw err;
    }
  }

  async getAssignmentByPromotion(id) {
    try {
      const assignments = await Assignment.find({ id_promotion: id });
      console.log("assignment by promotion: ");
      console.log(assignments);
      return assignments;
    } catch (err) {
      throw err;
    }
  }

  async updateAssignment(id, updateData) {
    try {
      if (!id) {
        throw new Error('Missing id for update');
      }

      const updatedAssignment = await Assignment.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
      );

      if (!updatedAssignment) {
        throw new Error('Assignment not found or could not be updated');
      }

      console.log("Assignment updated:", updatedAssignment);
      return updatedAssignment;
    } catch (err) {
      console.error("Error updating assignment:", err);
      throw err;
    }
  }

  async createAssignment(data) {
    try {
      const assignment = new Assignment(data);
      await assignment.save();
      console.log("service save assignment");
      return assignment;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = AssignmentService;
