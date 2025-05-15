"use client";
import React, { useRef } from 'react';
import { useScrollAnimate } from '@/hooks/useScrollAnimate';
import { Linkedin, Github, Mail } from 'lucide-react';

const socialLinks = [
	{
		name: 'LinkedIn',
		icon: <Linkedin size={32} />,
		url: 'https://www.linkedin.com/in/shubhamprasad1/',
	},
	{
		name: 'GitHub',
		icon: <Github size={32} />,
		url: 'https://github.com/Calatrux',
	},
	{
		name: 'Email',
		icon: <Mail size={32} />,
		url: 'mailto:shubm.prsd@gmail.com',
	},
];

const ContactSection = () => {
	const sectionRef = useRef<HTMLDivElement>(null);
	useScrollAnimate(sectionRef as React.RefObject<HTMLElement>);

	return (
		<section
			id="contact"
			ref={sectionRef}
			className="flex flex-col justify-center items-center py-16 px-4 scroll-animate min-h-[250px]"
		>
			<h2 className="text-5xl font-bold mb-12 text-center">Get in Touch</h2>
			<div className="flex space-x-8">
				{socialLinks.map((link, index) => (
					<a
						key={index}
						href={link.url}
						target="_blank"
						rel="noopener noreferrer"
						aria-label={link.name}
						className="text-gray-400 hover:text-white transition-colors duration-300 group"
					>
						<div className="p-4 bg-neutral-800/50 rounded-full shadow-lg border border-neutral-700 transform transition-all duration-300 hover:bg-neutral-700/70 hover:shadow-cyan-500/50 hover:scale-110">
							{link.icon}
						</div>
					</a>
				))}
			</div>
			<p className="mt-12 text-center text-muted-foreground">
				Feel free to reach out! I&apos;m always open to discussing new projects,
				creative ideas, or opportunities to collaborate.
			</p>
		</section>
	);
};

export default ContactSection;
