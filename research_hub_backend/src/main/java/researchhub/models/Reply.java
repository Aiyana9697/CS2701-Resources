package researchhub.models;

import jakarta.persistence.*;

@Entity
@Table(name = "replies")
public class Reply {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long discussionId;

    @Column(length = 2000)
    private String content;

    public Reply() {
    }

    public Reply(Long discussionId, String content) {
        this.discussionId = discussionId;
        this.content = content;
    }

    public Long getId() {
        return id;
    }

    public Long getDiscussionId() {
        return discussionId;
    }

    public String getContent() {
        return content;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setDiscussionId(Long discussionId) {
        this.discussionId = discussionId;
    }

    public void setContent(String content) {
        this.content = content;
    }
}