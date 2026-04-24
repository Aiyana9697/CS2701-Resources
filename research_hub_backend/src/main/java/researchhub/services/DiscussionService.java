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

    public List<DiscussionResponse> getAllDiscussions() {
        return discussionRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public DiscussionResponse createDiscussion(Discussion discussion) {
        if (isBlank(discussion.getAuthor()) || isBlank(discussion.getTitle()) || isBlank(discussion.getContent())) {
            throw new IllegalArgumentException("Author, title and content are required");
        }

        discussion.setLikes(0);
        discussion.setDislikes(0);
        discussion.setReplies(0);

        if (isBlank(discussion.getTimestamp())) {
            discussion.setTimestamp("Just now");
        }

        Discussion saved = discussionRepository.save(discussion);
        return toResponse(saved);
    }

    public DiscussionResponse likeDiscussion(Long id) {
        Discussion discussion = findDiscussion(id);
        discussion.setLikes(nullToZero(discussion.getLikes()) + 1);
        return toResponse(discussionRepository.save(discussion));
    }

    public DiscussionResponse dislikeDiscussion(Long id) {
        Discussion discussion = findDiscussion(id);
        discussion.setDislikes(nullToZero(discussion.getDislikes()) + 1);
        return toResponse(discussionRepository.save(discussion));
    }

    public List<Reply> getReplies(Long id) {
        findDiscussion(id);
        return replyRepository.findByDiscussionId(id);
    }

    public Reply addReply(Long discussionId, String content) {
        if (isBlank(content)) {
            throw new IllegalArgumentException("Reply content is required");
        }

        Discussion discussion = findDiscussion(discussionId);

        Reply reply = new Reply(discussionId, content);
        Reply savedReply = replyRepository.save(reply);

        discussion.setReplies(nullToZero(discussion.getReplies()) + 1);
        discussionRepository.save(discussion);

        return savedReply;
    }

    public Map<String, Object> getDiscussionWithReplies(Long id) {
        Discussion discussion = findDiscussion(id);
        List<Reply> replies = replyRepository.findByDiscussionId(id);

        Map<String, Object> response = new HashMap<>();
        response.put("discussion", toResponse(discussion));
        response.put("replies", replies);

        return response;
    }

    public void deleteDiscussion(Long id) {
        findDiscussion(id);

        List<Reply> replies = replyRepository.findByDiscussionId(id);
        replyRepository.deleteAll(replies);

        discussionRepository.deleteById(id);
    }

    private Discussion findDiscussion(Long id) {
        return discussionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Discussion not found with id: " + id));
    }

    private DiscussionResponse toResponse(Discussion discussion) {
        int replyCount = replyRepository.findByDiscussionId(discussion.getId()).size();

        return new DiscussionResponse(
                discussion.getId(),
                discussion.getAuthor(),
                discussion.getTitle(),
                discussion.getContent(),
                replyCount,
                nullToZero(discussion.getLikes()),
                nullToZero(discussion.getDislikes()),
                discussion.getTimestamp()
        );
    }

    private boolean isBlank(String value) {
        return value == null || value.trim().isEmpty();
    }

    private int nullToZero(Integer value) {
        return value == null ? 0 : value;
    }
}