package com.homenest.booking.service;


import com.homenest.booking.client.UserClient;
import com.homenest.booking.model.Review;
import com.homenest.booking.model.UserResponseDto;
import com.homenest.booking.repository.ReviewRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.time.LocalDateTime;
import java.util.Optional;
@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private UserClient userClient;

    @Transactional
    public Review addReview(Review review, String userEmail) {

        UserResponseDto userResponse = userClient.getUserByEmail(userEmail);

        System.out.println(userResponse);
        review.setUserId(userResponse.getId());
        // Additional business logic can be added here
        review.setCreatedAt(LocalDateTime.now());
        review.setUpdatedAt(LocalDateTime.now());
        return reviewRepository.save(review);
    }

    @Transactional
    public Review updateReview(Long id, Review reviewDetails) {
        Optional<Review> optionalReview = reviewRepository.findById(id);
        if (optionalReview.isPresent()) {
            Review review = optionalReview.get();
            review.setBookingId(reviewDetails.getBookingId());
            review.setRating(reviewDetails.getRating());
            review.setComment(reviewDetails.getComment());
            review.setUserId(reviewDetails.getUserId());
            review.setTimestamp(reviewDetails.getTimestamp());
            review.setServiceProviderId(reviewDetails.getServiceProviderId());
            review.setUpdatedAt(LocalDateTime.now());
            return reviewRepository.save(review);
        } else {
            throw new RuntimeException("Review not found with id " + id);
        }
    }

    @Transactional
    public void deleteReview(Long id) {
        reviewRepository.deleteById(id);
    }

    public Optional<Review> getReviewById(Long id) {
        return reviewRepository.findById(id);
    }

    public Iterable<Review> getAllReviews() {
        return reviewRepository.findAll();
    }
}
