package researchhub.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import researchhub.models.Discussion;

public interface DiscussionRepository extends JpaRepository<Discussion, Long> {
}