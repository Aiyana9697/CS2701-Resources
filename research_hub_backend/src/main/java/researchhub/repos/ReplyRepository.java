package researchhub.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import researchhub.models.Reply;

import java.util.List;

public interface ReplyRepository extends JpaRepository<Reply, Long> {
    List<Reply> findByDiscussionId(Long discussionId);
}