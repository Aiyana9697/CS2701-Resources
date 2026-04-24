package researchhub.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import researchhub.models.Discussion;
import researchhub.models.Reply;
import researchhub.repos.DiscussionRepository;
import researchhub.repos.ReplyRepository;

@Configuration
public class DataLoader {

    @Bean
    CommandLineRunner loadData(
            DiscussionRepository discussionRepository,
            ReplyRepository replyRepository
    ) {
        return args -> {
            if (discussionRepository.count() == 0) {
                Discussion d1 = discussionRepository.save(new Discussion(
                        "Dr. Sarah Chen",
                        "Impact of mining on hydrothermal vent ecosystems",
                        "Exploring the long-term impact of extraction activity on vent biodiversity.",
                        0,
                        0,
                        0,
                        "2 hours ago"
                ));

                Discussion d2 = discussionRepository.save(new Discussion(
                        "Prof. James Wilson",
                        "Regulatory frameworks for sustainable deep-sea exploration",
                        "What kind of international policy structure would best support safe research?",
                        0,
                        0,
                        0,
                        "5 hours ago"
                ));

                Discussion d3 = discussionRepository.save(new Discussion(
                        "Dr. Maya Patel",
                        "Latest findings on APEI effectiveness",
                        "Sharing recent observations and open questions about APEI effectiveness.",
                        0,
                        0,
                        0,
                        "1 day ago"
                ));

                replyRepository.save(new Reply(d1.getId(), "Interesting topic. We should compare protected and unprotected regions."));
                replyRepository.save(new Reply(d1.getId(), "Do you also have data for recovery time after disturbance?"));
                d1.setReplies(2);
                discussionRepository.save(d1);

                replyRepository.save(new Reply(d2.getId(), "A standards-based international framework could help here."));
                d2.setReplies(1);
                discussionRepository.save(d2);
            }
        };
    }
}