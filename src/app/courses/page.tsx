"use client";

import React from 'react';
import Image from 'next/image';
import { BookOpen, Award, Target, Users, Zap, ShieldCheck, ArrowRight, HelpCircle, Clock, CheckCircle } from 'lucide-react';
import { GOOGLE_FORM_URL } from '@/lib/config';
import WaveSeparator from '@/components/ui/wave-separator';

const CoursesPage = () => {
    // Using images from the live makodivers.club site
    const heroBgImage = "https://img1.wsimg.com/isteam/getty/156323241/:/rs=w:2400,h:1200,cg:true";

    const courses = [
        {
            title: "Open Water Diver",
            level: "Beginner",
            desc: "Start your underwater journey with us! Begin with our Open Water Course to learn the basics of scuba diving. Explore a whole new world and get certified to dive up to 18 meters.",
            icon: <BookOpen className="w-7 h-7" />,
            color: "from-blue-500 to-cyan-400",
            image: "https://img1.wsimg.com/isteam/getty/1461642666/:/rs=w:800,h:600,cg:true",
            duration: "3-4 Days",
            highlights: ["Pool training sessions", "4 ocean certification dives", "PADI certification card"]
        },
        {
            title: "Advanced Adventure Diver",
            level: "Intermediate",
            desc: "Take your diving skills to the next level with our Advanced Open Water training. Train with experts and gain confidence in deeper waters through our specialty adventure dives.",
            icon: <Award className="w-7 h-7" />,
            color: "from-primary to-amber-400",
            image: "https://img1.wsimg.com/isteam/getty/1131773097/:/rs=w:800,h:600,cg:true",
            duration: "2-3 Days",
            highlights: ["5 adventure dives", "Deep diving experience", "Navigation mastery"]
        },
        {
            title: "Enriched Air Nitrox",
            level: "Specialty",
            desc: "Nitrox training is essential for those looking to enhance their diving experience. It helps you maximize every dive, allows for more bottom time, and is perfect for advanced divers.",
            icon: <Zap className="w-7 h-7" />,
            color: "from-yellow-400 to-orange-500",
            image: "https://img1.wsimg.com/isteam/getty/538368359/:/rs=w:800,h:600,cg:true",
            duration: "1 Day",
            highlights: ["Extended bottom time", "Gas analysis training", "Theory & certification"]
        },
        {
            title: "Deep Diving Speciality",
            level: "Specialty",
            desc: "Master advanced techniques for safe and exciting deep dives through our Deep Diving Specialty courses. Discover the thrill of depth up to 40 meters while enhancing your safety skills.",
            icon: <Target className="w-7 h-7" />,
            color: "from-red-500 to-pink-500",
            image: "https://img1.wsimg.com/isteam/getty/531989748/:/rs=w:800,h:600,cg:true",
            duration: "2 Days",
            highlights: ["40m depth certification", "Decompression theory", "Advanced dive planning"]
        },
        {
            title: "Divemaster Course",
            level: "Professional",
            desc: "Transform your passion into a profession! Lead dives, guide others, and embrace the diving lifestyle. Begin your professional journey with the Divemaster Course.",
            icon: <Users className="w-7 h-7" />,
            color: "from-indigo-500 to-purple-500",
            image: "https://img1.wsimg.com/isteam/getty/155444888/:/rs=w:800,h:600,cg:true",
            duration: "2-4 Weeks",
            highlights: ["Leadership training", "Assist certified instructors", "Professional certification"]
        },
        {
            title: "Intro to Tech",
            level: "Advanced",
            desc: "Step into the world of technical diving by advancing your skills. Learn about advanced gear, techniques, and safety practices essential for extended range diving.",
            icon: <ShieldCheck className="w-7 h-7" />,
            color: "from-emerald-500 to-teal-400",
            image: "https://images.unsplash.com/photo-1605973029521-8154da591bd7?q=80&w=800",
            duration: "3 Days",
            highlights: ["Tech configuration", "Gas management", "Team diving protocols"]
        }
    ];

    return (
        <div className="bg-brand-navy min-h-screen">
            {/* Page Header Section */}
            <div className="relative pt-32 md:pt-40 pb-20 overflow-hidden">
                {/* Background Image from Live Site */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src={heroBgImage}
                        alt="Diving Background"
                        fill
                        className="object-cover opacity-20"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/60 via-brand-navy/80 to-brand-navy" />
                </div>

                <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 blur-[100px] rounded-full pointer-events-none" />

                <div className="container-width px-6 relative z-10 text-center max-w-3xl mx-auto">
                    <span className="text-primary uppercase tracking-[0.3em] text-[10px] font-bold mb-4 block animate-fade-in">PADI & SDI Certifications</span>
                    <h1 className="text-white mb-6 text-5xl md:text-6xl font-display font-medium animate-fade-in-up">
                        Diving <span className="text-primary">Courses</span>
                    </h1>
                    <p className="text-gray-400 text-lg leading-relaxed animate-fade-in-up delay-100">
                        From your very first breath underwater to professional certifications, our expert instructors ensure a safe and supportive learning environment.
                    </p>
                </div>
            </div>

            <div className="container-width px-6 pb-20 relative z-10">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {courses.map((course, i) => (
                        <div
                            key={i}
                            className="group glass-card rounded-[2rem] border border-white/5 hover:border-primary/40 transition-all duration-500 flex flex-col overflow-hidden hover:-translate-y-2 shadow-xl"
                        >
                            {/* Course Image */}
                            <div className="relative h-48 overflow-hidden">
                                <Image
                                    src={course.image}
                                    alt={course.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/50 to-transparent" />

                                {/* Level Badge */}
                                <div className="absolute top-4 left-4">
                                    <span className={`inline-block px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-widest bg-gradient-to-r ${course.color} text-white shadow-lg`}>
                                        {course.level}
                                    </span>
                                </div>

                                {/* Duration Badge */}
                                <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full">
                                    <Clock size={12} className="text-primary" />
                                    <span className="text-white text-[10px] font-bold">{course.duration}</span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-8 flex flex-col flex-grow">
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${course.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                                    {course.icon}
                                </div>

                                <h3 className="text-white text-2xl font-display font-bold mb-4 group-hover:text-primary transition-colors">{course.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed mb-6 grow">
                                    {course.desc}
                                </p>

                                {/* Highlights */}
                                <div className="space-y-2 mb-8">
                                    {course.highlights.map((highlight, idx) => (
                                        <div key={idx} className="flex items-center gap-2 text-gray-500 text-xs">
                                            <CheckCircle size={12} className="text-primary" />
                                            <span>{highlight}</span>
                                        </div>
                                    ))}
                                </div>

                                <a
                                    href={GOOGLE_FORM_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-3 bg-white/5 border border-white/10 text-white font-bold uppercase text-[10px] tracking-[0.2em] py-4 rounded-xl hover:bg-primary hover:text-brand-navy hover:border-primary transition-all duration-300 group/btn"
                                >
                                    Enroll Now
                                    <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

                {/* FAQ / Info Section */}
                <div className="mt-24 p-12 rounded-[2.5rem] bg-white/[0.02] border border-white/5 flex flex-col lg:flex-row items-center gap-12">
                    <div className="lg:w-1/2">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                <HelpCircle size={24} />
                            </div>
                            <h2 className="text-white text-3xl font-display font-bold italic">Why train with Mako?</h2>
                        </div>
                        <ul className="space-y-4">
                            {[
                                "Certified PADI & SDI Instructors",
                                "Small group sizes for personalized attention",
                                "Modern and well-maintained rental equipment",
                                "Focus on safety and ecological awareness"
                            ].map((item, idx) => (
                                <li key={idx} className="flex items-center gap-3 text-gray-400">
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="lg:w-1/2 text-center lg:text-right">
                        <p className="text-gray-500 text-sm italic mb-6">"Our goal is not just to certify you, but to make you a confident and capable diver for life."</p>
                        <a
                            href="/contact"
                            className="inline-block bg-primary text-brand-navy font-bold uppercase text-xs tracking-[0.2em] py-4 px-8 rounded-xl hover:bg-white transition-all shadow-xl"
                        >
                            Ask an Instructor
                        </a>
                    </div>
                </div>
            </div>

            {/* Wave Separator before Footer */}
            <div className="relative">
                <WaveSeparator position="bottom" color="text-[#020408]" />
            </div>
        </div>
    );
};

export default CoursesPage;
