"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Github, Mail } from 'lucide-react';

const socialLinks = [
	{
		name: 'LinkedIn',
		icon: <Linkedin size={28} strokeWidth={1.5} />,
		url: 'https://www.linkedin.com/in/shubhamprasad1/',
	},
	{
		name: 'GitHub',
		icon: <Github size={28} strokeWidth={1.5} />,
		url: 'https://github.com/Calatrux',
	},
	{
		name: 'Email',
		icon: <Mail size={28} strokeWidth={1.5} />,
		url: 'mailto:shubm.prsd@gmail.com',
	},
];

const containerVariants: import('framer-motion').Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.15,
			delayChildren: 0.2,
		},
	},
};

const itemVariants: import('framer-motion').Variants = {
	hidden: { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const ContactSection = () => {
	return (
		<section
			id="contact"
			className="flex flex-col justify-center items-center py-20 px-4 min-h-[40vh] relative overflow-hidden"
		>
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(255,255,255,0.02)_0%,transparent_50%)] pointer-events-none" />

			<motion.div
				variants={containerVariants}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, margin: "-50px" }}
				className="flex flex-col items-center z-10 max-w-2xl text-center"
			>
				<motion.h2
					variants={itemVariants}
					className="text-4xl md:text-5xl font-bold mb-8 tracking-tighter text-white"
				>
					Get in Touch
				</motion.h2>

				<motion.p
					variants={itemVariants}
					className="mb-10 text-base md:text-lg text-neutral-400 font-light leading-relaxed"
				>
					Feel free to reach out! I&apos;m always open to discussing new projects,
					creative ideas, or opportunities to collaborate.
				</motion.p>

				<motion.div variants={itemVariants} className="flex space-x-6 md:space-x-8">
					{socialLinks.map((link, index) => (
						<a
							key={index}
							href={link.url}
							target="_blank"
							rel="noopener noreferrer"
							aria-label={link.name}
							className="text-neutral-400 hover:text-white transition-colors duration-300 group"
						>
							<div className="p-4 bg-white/5 backdrop-blur-md rounded-full shadow-lg border border-white/10 transform transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:scale-110 hover:-translate-y-1.5 hover:shadow-[0_10px_20px_rgba(255,255,255,0.05)]">
								{link.icon}
							</div>
						</a>
					))}
				</motion.div>
			</motion.div>
		</section>
	);
};

export default ContactSection;
