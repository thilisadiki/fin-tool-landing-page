import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { tools } from '@/data/landingPageData';

const ToolsSection = () => {
  return (
    <section id="tools" className="px-6 py-20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Our Financial Calculators
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Select a tool to get started. All our calculators are free, secure, and designed for the South African financial landscape.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool, index) => (
            <motion.article
              key={tool.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group"
            >
              <div className="dark:bg-slate-800/50 bg-slate-100 backdrop-blur-lg rounded-2xl p-8 border border-border hover:border-accent transition-all duration-300 h-full flex flex-col">
                <div className={`w-16 h-16 bg-gradient-to-r ${tool.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <tool.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-foreground mb-4">{tool.title}</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed flex-grow">{tool.description}</p>
                
                <ul className="space-y-2 mb-8">
                  {tool.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-muted-foreground">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full mr-3 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Button asChild className={`w-full mt-auto bg-gradient-to-r ${tool.color} hover:opacity-90 text-white dark:text-white`}>
                  <a href={tool.url} target="_blank" rel="noopener noreferrer">
                    Use {tool.title.split(' ')[0]} Calculator
                  </a>
                </Button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToolsSection;