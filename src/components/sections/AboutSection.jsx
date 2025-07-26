import React from 'react';
import { motion } from 'framer-motion';
import { features } from '@/data/landingPageData';

const AboutSection = () => {
    return (
        <section id="about" className="px-6 py-20 bg-accent/30">
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                        About Quick Money Tool
                    </h2>
                    <p className="text-lg text-muted-foreground mb-4">
                        Quick Money Tool was created to demystify financial planning for everyday South Africans. We believe that everyone deserves access to high-quality, easy-to-use tools to make informed decisions about their money. Whether you're planning for your first car, submitting your tax returns, or saving for retirement, our calculators are here to provide clarity and confidence.
                    </p>
                    <p className="text-lg text-muted-foreground">
                        Our commitment is to accuracy, privacy, and simplicity. We continuously update our tools to reflect the latest SARS tax tables and financial regulations, ensuring you get the most reliable estimates. Your data is yours alone—we never store it.
                    </p>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="grid grid-cols-2 gap-6"
                >
                    {features.map((feature) => (
                        <div key={feature.title} className="text-left group">
                            <div className="w-16 h-16 bg-gradient-to-r from-emerald-400/20 to-blue-500/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <feature.icon className="w-8 h-8 text-emerald-400" />
                            </div>
                            <h3 className="text-xl font-bold text-foreground mb-2">{feature.title}</h3>
                            <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                        </div>
                    ))}
                </motion.div>
            </div>
      </section>
    );
};

export default AboutSection;