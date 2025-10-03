import { review } from "../../models/review.js";


export const createReview = async(req,res) => {
    try {
        const ok = await review.create({
            description:req.body.description , 
            productId:req.body.productId , 
            userId:req.user.id,
            rating:req.body.rating
        });
        
        return res.status(200).json({
            message:"Review added successfully",
            Data:ok
        })
        
    } catch (error) {
        console.error("Error" , error.message);
       return res.status(500).json({message:"Internal server error"}) 
    }
}

export const getReviews = async (req, res) => {
  try {
    const { productId } = req.params;

    const reviews = await review.find({ productId }).populate('userId', 'name email');

    return res.status(200).json({
      message: "Reviews fetched successfully",
      data: reviews
    });

  } catch (error) {
    console.error("Get Reviews Error:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateReview = async (req, res) => {
  try {
    const { id } = req.params; // review ID
    const { description, rating } = req.body;

    const existingReview = await review.findById(id);
    if (!existingReview) {
      return res.status(404).json({ message: "Review not found" });
    }

    // Check ownership
    if (existingReview.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized to update this review" });
    }

    existingReview.description = description || existingReview.description;
    existingReview.rating = rating || existingReview.rating;

    const updatedReview = await existingReview.save();

    return res.status(200).json({
      message: "Review updated successfully",
      data: updatedReview
    });

  } catch (error) {
    console.error("Update Review Error:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params; // review ID

    const existingReview = await review.findById(id);
    if (!existingReview) {
      return res.status(404).json({ message: "Review not found" });
    }

    // Check ownership
    if (existingReview.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized to delete this review" });
    }

    await review.findByIdAndDelete(id);

    return res.status(200).json({ message: "Review deleted successfully" });

  } catch (error) {
    console.error("Delete Review Error:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
