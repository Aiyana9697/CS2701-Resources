package researchhub.services;

import org.springframework.stereotype.Service;
import researchhub.dto.DiscussionResponse;
import researchhub.models.Discussion;
import researchhub.models.Reply;
import researchhub.repos.DiscussionRepository;
import researchhub.repos.ReplyRepository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class DiscussionService {

    private final DiscussionRepository discussionRepository;
    private final ReplyRepository replyRepository;

    public DiscussionService(DiscussionRepository discussionRepository, ReplyRepository replyRepository) {
        this.discussionRepository = discussionRepository;
        this.replyRepository = replyRepository;
    }

    public List<Discussion> getAllDiscussionsRaw() {
        return discussionRepository.findAll();
    }

    public List<DiscussionResponse> getAllDiscussions() {
        return discussionRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public DiscussionResponse createDiscussion(Discussion discussion) {
        if (discussion.getReplies() == null) discussion.setReplies(0);
        if (discussion.getLikes() == null) discussion.setLikes(0);
        if (discussion.getDislikes() == null) discussion.setDislikes(0);
        if (discussion.getTimestamp() == null || discussion.getTimestamp().isBlank()) {
            discussion.setTimestamp("just now");
        }

        Discussion saved = discussionRepository.save(discussion);
        return mapToResponse(saved);
    }

    public DiscussionResponse likeDiscussion(Long id) {
        Discussion discussion = discussionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Discussion not found"));

        discussion.setLikes(discussion.getLikes() + 1);
        Discussion updated = discussionRepository.save(discussion);

        return mapToResponse(updated);
    }

    public DiscussionResponse dislikeDiscussion(Long id) {
        Discussion discussion = discussionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Discussion not found"));

        discussion.setDislikes(discussion.getDislikes() + 1);
        Discussion updated = discussionRepository.save(discussion);

        return mapToResponse(updated);
    }

    public List<Reply> getReplies(Long id) {
        return replyRepository.findByDiscussionId(id);
    }

    public Reply addReply(Long id, String content) {
        Discussion discussion = discussionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Discussion not found"));

        Reply reply = new Reply(id, content);
        Reply savedReply = replyRepository.save(reply);

        discussion.setReplies(discussion.getReplies() + 1);
        discussionRepository.save(discussion);

        return savedReply;
    }

    public Map<String, Object> getDiscussionWithReplies(Long id) {
        Discussion discussion = discussionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Discussion not found"));

        List<Reply> replies = replyRepository.findByDiscussionId(id);

        Map<String, Object> response = new HashMap<>();
        response.put("discussion", mapToResponse(discussion));
        response.put("replies", replies);

        return response;
    }

    public void deleteDiscussion(Long id) {
        if (!discussionRepository.existsById(id)) {
            throw new RuntimeException("Discussion not found");
        }
        discussionRepository.deleteById(id);
    }

    private DiscussionResponse mapToResponse(Discussion discussion) {
        return new DiscussionResponse(
                discussion.getId(),
                discussion.getAuthor(),
                discussion.getTitle(),
                discussion.getContent(),
                discussion.getReplies(),
                discussion.getLikes(),
                discussion.getDislikes(),
                discussion.getTimestamp()
        );
    }
}