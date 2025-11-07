import React from "react";
import { motion } from "framer-motion";
import { Microscope, Fish, Leaf, Waves, ChevronRight, BookOpen } from "lucide-react";
import { ImageWithFallback } from "./ImageWithFallback";
import "./EducationalPortal.css"; // Import the CSS file

const educationalTopics = [
  {
    icon: Waves,
    title: "Sediment Plumes",
    description:
      "Understanding the environmental impact of deep-sea mining on sediment distribution and marine ecosystems.",
    level: "Intermediate",
    duration: "15 min read",
    image:
      "https://images.unsplash.com/photo-1613213322190-b9eb59313eec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    icon: Fish,
    title: "Marine Species Protection",
    description:
      "Explore the diverse marine life in deep-sea environments and conservation strategies.",
    level: "Beginner",
    duration: "12 min read",
    image:
      "https://images.unsplash.com/photo-1761590699238-6f763c27f012?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    icon: Microscope,
    title: "APEIs & Protected Areas",
    description:
      "Areas of Particular Environmental Interest and their role in sustainable ocean management.",
    level: "Advanced",
    duration: "20 min read",
    image:
      "https://images.unsplash.com/photo-1583326187695-01fb3e059569?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    icon: Leaf,
    title: "Sustainability Framework",
    description:
      "Learn about SDG14 implementation and sustainable deep-sea exploration practices.",
    level: "Intermediate",
    duration: "18 min read",
    image:
      "https://images.unsplash.com/photo-1710023961072-492b4bed6ecc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
];

const getLevelClass = (level: string) => {
  switch (level) {
    case "Beginner":
      return "badge badge-beginner";
    case "Intermediate":
      return "badge badge-intermediate";
    case "Advanced":
      return "badge badge-advanced";
    default:
      return "badge";
  }
};

export function EducationalPortal() {
  return (
    <section className="educational-portal">
      <div className="educational-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="educational-header"
        >
          <div className="portal-tag">
            <BookOpen />
            <span>Educational Portal</span>
          </div>
          <h2>Learn About Ocean Conservation</h2>
          <p>
            Interactive resources, infographics, and expert insights on deep-sea ecosystems
          </p>
        </motion.div>

        <div className="educational-grid">
          {educationalTopics.map((topic, index) => {
            const Icon = topic.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="card">
                  <div className="card-image">
                    <ImageWithFallback src={topic.image} alt={topic.title} />
                    <div className="card-gradient"></div>
                    <div className="card-icon">
                      <Icon />
                    </div>
                  </div>

                  <div className="card-body">
                    <h3>{topic.title}</h3>
                    <p>{topic.description}</p>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "1rem",
                      }}
                    >
                      <span className={getLevelClass(topic.level)}>{topic.level}</span>
                      <span className="card-duration">{topic.duration}</span>
                    </div>

                    <button className="card-button">
                      Start Learning
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="card-footer"
        >
          <button>View All Resources</button>
        </motion.div>
      </div>
    </section>
  );
}
