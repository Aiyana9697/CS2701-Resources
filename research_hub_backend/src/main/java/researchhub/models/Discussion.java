package researchhub.models;

import jakarta.persistence.*;

@Entity
@Table(name = "discussions")
public class Discussion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String author;
    private String title;

    @Column(length = 3000)
    private String content;

    private Integer replies;
    private Integer likes;
    private Integer dislikes;
    private String timestamp;

    public Discussion() {
    }

    public Discussion(String author, String title, String content, Integer replies,
                      Integer likes, Integer dislikes, String timestamp) {
        this.author = author;
        this.title = title;
        this.content = content;
        this.replies = replies;
        this.likes = likes;
        this.dislikes = dislikes;
        this.timestamp = timestamp;
    }

    public Long getId() {
        return id;
    }

    public String getAuthor() {
        return author;
    }

    public String getTitle() {
        return title;
    }

    public String getContent() {
        return content;
    }

    public Integer getReplies() {
        return replies;
    }

    public Integer getLikes() {
        return likes;
    }

    public Integer getDislikes() {
        return dislikes;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setReplies(Integer replies) {
        this.replies = replies;
    }

    public void setLikes(Integer likes) {
        this.likes = likes;
    }

    public void setDislikes(Integer dislikes) {
        this.dislikes = dislikes;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }
}