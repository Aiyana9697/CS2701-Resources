package researchhub.controllers;

import org.springframework.web.bind.annotation.*;
import researchhub.dto.DiscussionResponse;
import researchhub.models.Discussion;
import researchhub.models.Reply;
import researchhub.services.DiscussionService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/discussions")
@CrossOrigin(origins = "*")
public class DiscussionController {

    private final DiscussionService discussionService;

    public DiscussionController(DiscussionService discussionService) {
        this.discussionService = discussionService;
    }

    @GetMapping
    public List<DiscussionResponse> getAllDiscussions() {
        return discussionService.getAllDiscussions();
    }

    @PostMapping
    public DiscussionResponse createDiscussion(@RequestBody Discussion discussion) {
        return discussionService.createDiscussion(discussion);
    }

    @PostMapping("/{id}/like")
    public DiscussionResponse likeDiscussion(@PathVariable Long id) {
        return discussionService.likeDiscussion(id);
    }

    @PostMapping("/{id}/dislike")
    public DiscussionResponse dislikeDiscussion(@PathVariable Long id) {
        return discussionService.dislikeDiscussion(id);
    }

    @GetMapping("/{id}/replies")
    public List<Reply> getReplies(@PathVariable Long id) {
        return discussionService.getReplies(id);
    }

    @PostMapping("/{id}/replies")
    public Reply addReply(@PathVariable Long id, @RequestBody Map<String, String> body) {
        return discussionService.addReply(id, body.get("content"));
    }

    @GetMapping("/{id}/full")
    public Map<String, Object> getDiscussionWithReplies(@PathVariable Long id) {
        return discussionService.getDiscussionWithReplies(id);
    }

    @DeleteMapping("/{id}")
    public String deleteDiscussion(@PathVariable Long id) {
        discussionService.deleteDiscussion(id);
        return "Discussion deleted successfully";
    }
}