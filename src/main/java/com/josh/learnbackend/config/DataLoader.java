package com.josh.learnbackend.config;

import com.josh.learnbackend.model.TimelineEvent;
import com.josh.learnbackend.repository.TimelineEventRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataLoader {

    @Bean
    CommandLineRunner loadData(TimelineEventRepository timelineEventRepository) {
        return args -> {
            if (timelineEventRepository.count() == 0) {
                timelineEventRepository.save(new TimelineEvent(
                        "1982",
                        "UNCLOS Adopted",
                        "The 'Constitution for the Oceans' is signed, defining maritime zones.",
                        "The United Nations Convention on the Law of the Sea (UNCLOS) defined the 200-nautical-mile Exclusive Economic Zone (EEZ) and declared the seabed beyond national jurisdiction as the 'Common Heritage of Mankind,' managed by the ISA.",
                        "positive"
                ));

                timelineEventRepository.save(new TimelineEvent(
                        "1994",
                        "ISA Operations Begin",
                        "The International Seabed Authority (ISA) is formally established in Jamaica.",
                        "The ISA was tasked with organizing and controlling all mineral-related activities in the international seabed area. Its dual mandate—to facilitate mining while protecting the marine environment—remains a subject of intense global debate today.",
                        "mixed"
                ));

                timelineEventRepository.save(new TimelineEvent(
                        "2015",
                        "SDG 14 Established",
                        "The UN adopts the 2030 Agenda, including Goal 14: Life Below Water.",
                        "SDG 14 was the first universal global framework to explicitly target marine pollution, ocean acidification, and the regulation of harvesting to end overfishing. It set specific targets for conserving at least 10% of coastal and marine areas.",
                        "positive"
                ));

                timelineEventRepository.save(new TimelineEvent(
                        "2023",
                        "The High Seas Treaty",
                        "Nations agree to the BBNJ treaty to protect biodiversity beyond national jurisdiction.",
                        "After nearly two decades of talks, the Biodiversity Beyond National Jurisdiction (BBNJ) treaty was agreed upon. It provides a legal framework for establishing Marine Protected Areas (MPAs) on the high seas, which cover nearly two-thirds of the ocean.",
                        "positive"
                ));

                timelineEventRepository.save(new TimelineEvent(
                        "2024",
                        "The Mining Moratorium Call",
                        "25+ countries call for a 'precautionary pause' on deep-sea mining.",
                        "With the ISA nearing the finalization of the Mining Code, a growing coalition of nations argued that scientific knowledge of the deep sea is insufficient to approve commercial mining without risking irreversible ecological damage.",
                        "mixed"
                ));
            }
        };
    }
}