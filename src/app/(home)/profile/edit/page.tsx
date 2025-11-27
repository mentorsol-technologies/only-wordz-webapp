"use client";
import { useRef, useState } from "react";
import { MoreVertical, Camera, X, Plus, User, Mail, Phone, MapPin } from "lucide-react";
import NavigateBack from "@/components/NavigateBack";
import Image from "next/image";

import { Instagram, Twitter, Youtube, Music } from "lucide-react";

const socialPlatforms = [
    {
        id: "instagram",
        name: "Instagram",
        icon: <Instagram className="w-5 h-5" />
    },
    {
        id: "tiktok",
        name: "TikTok",
        icon: <Music className="w-5 h-5" />
    },
    {
        id: "twitter",
        name: "Twitter",
        icon: <Twitter className="w-5 h-5" />
    },
    {
        id: "youtube",
        name: "YouTube",
        icon: <Youtube className="w-5 h-5" />
    },
];


export default function ProfileEdit() {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const profilePhotoRef = useRef<HTMLInputElement>(null);

    const savedData = JSON.parse(localStorage.getItem("profileData") || "{}");

    const [fullName, setFullName] = useState(savedData.fullName || "Sarah Mitchell");
    const [username, setUsername] = useState(savedData.username || "sarahcreates");
    const [email, setEmail] = useState(savedData.email || "onlywordz.com@sarahcreates");
    const [phone, setPhone] = useState(savedData.phone || "+1 (555) 123-4567");
    const [location, setLocation] = useState(savedData.location || "City, Country");
    const [aboutMe, setAboutMe] = useState(savedData.aboutMe || "Tell your potential buyers about yourself...\nUse emojis to make it fun! ✨");
    const [activeSocials, setActiveSocials] = useState<string[]>(savedData.activeSocials || ["instagram"]);
    const [socialLinks, setSocialLinks] = useState<Record<string, string>>(savedData.socialLinks || { instagram: "", tiktok: "", twitter: "", youtube: "" });
    const [photos, setPhotos] = useState<string[]>(savedData.photos || []);
    const [profilePhoto, setProfilePhoto] = useState(savedData.profilePhoto || "/images/img (2).png");

    const toggleSocial = (id: string) => {
        if (activeSocials.includes(id)) {
            setActiveSocials(activeSocials.filter((s) => s !== id));
        } else {
            setActiveSocials([...activeSocials, id]);
        }
    };

    const handleSocialLinkChange = (platformId: string, url: string) => {
        setSocialLinks({ ...socialLinks, [platformId]: url });
    };

    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && photos.length < 12) {
            const reader = new FileReader();
            reader.onloadend = () => setPhotos([...photos, reader.result as string]);
            reader.readAsDataURL(file);
        }
    };

    const handleProfilePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setProfilePhoto(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const removePhoto = (index: number) => setPhotos(photos.filter((_, i) => i !== index));

    const handleSave = () => {
        const profileData = { fullName, username, email, phone, location, aboutMe, activeSocials, socialLinks, photos, profilePhoto };
        localStorage.setItem("profileData", JSON.stringify(profileData));
        window.location.href = "/profile"; // redirect to profile page
    };

    const handleCancel = () => window.location.href = "/profile";

    return (
        <div className="min-h-screen bg-[#F8F7F9] flex flex-col">
            <header className="bg-white border-b border-[#C1BDDB] shadow-sm sticky top-0 z-50">
                <div className="max-w-[640px] mx-auto px-4 sm:px-0 py-4 flex items-center justify-between">
                    <NavigateBack />
                    <h1 className="text-lg font-medium text-black">@{username}</h1>
                    <button className="flex items-center justify-center w-10 h-10">
                        <MoreVertical className="w-6 h-6 text-[#303A2B]" strokeWidth={2} />
                    </button>
                </div>
            </header>

            <main className="flex-1 flex flex-col items-center gap-4 px-4 py-6">
                <div className="w-full max-w-[640px] flex flex-col gap-6">
                    <div className="bg-white rounded-[14px] border border-[rgba(0,0,0,0.10)] p-6 flex flex-col items-center gap-4">
                        <div className="relative">
                            <Image
                                src={profilePhoto}
                                alt={fullName}
                                width={96}
                                height={96}
                                className="rounded-full w-24 h-24 object-cover"
                            />
                            <button
                                onClick={() => profilePhotoRef.current?.click()}
                                className="absolute bottom-0 right-0 w-8 h-8 cursor-pointer rounded-full bg-linear-to-r from-[#F6339A] to-[#9810FA] shadow-lg flex items-center justify-center"
                            >
                                <Camera className="w-4 h-4 text-white" strokeWidth={1.33} />
                            </button>
                            <input ref={profilePhotoRef} type="file" accept="image/*" onChange={handleProfilePhotoUpload} className="hidden" />
                        </div>
                        <h2 className="text-base text-[#0A0A0A]">{fullName}</h2>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-[#00C950]" />
                            <span className="text-base text-[#4A5565]">Online</span>
                        </div>
                    </div>

                    <div className="bg-white rounded-[14px] border border-[rgba(0,0,0,0.10)] p-6 flex flex-col gap-5">
                        <h3 className="text-base text-[#0A0A0A]">Social Links</h3>
                        <div className="flex flex-wrap gap-3">
                            {socialPlatforms.map(platform => {
                                const isActive = activeSocials.includes(platform.id);
                                return (
                                    <button
                                        key={platform.id}
                                        onClick={() => toggleSocial(platform.id)}
                                        className={`flex items-center gap-2 px-4 py-2.5 cursor-pointer rounded-[10px] border-2 transition-colors ${isActive
                                            ? "border-[#F6339A] bg-[#FDF2F8] text-[#F6339A]"
                                            : "border-[#E5E7EB] bg-white text-[#4A5565]"
                                            }`}
                                    >
                                        <span className="w-5 h-5">{platform.icon}</span>
                                        <span className="text-base">{platform.name}</span>
                                    </button>
                                );
                            })}
                        </div>
                        {activeSocials.length > 0 && (
                            <div className="flex flex-col gap-4">
                                {socialPlatforms.filter(p => activeSocials.includes(p.id)).map(platform => (
                                    <div key={platform.id} className="flex flex-col gap-2">
                                        <label className="text-sm text-[#0A0A0A]">{platform.name} URL</label>
                                        <input
                                            type="url"
                                            placeholder={`https://${platform.id}.com/username`}
                                            value={socialLinks[platform.id] || ""}
                                            onChange={(e) => handleSocialLinkChange(platform.id, e.target.value)}
                                            className="w-full px-4 py-2 rounded-lg bg-[#F3F3F5] border border-transparent text-sm text-[#717182] placeholder-[#99A1AF] focus:border-[#FF99C9] focus:outline-none"
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Basic Info */}
                    <div className="bg-white rounded-[14px] border border-[rgba(0,0,0,0.10)] p-6 flex flex-col gap-10">
                        <h3 className="text-base text-[#0A0A0A]">Basic Information</h3>
                        <div className="flex flex-col gap-4">
                            {/* Full Name */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm text-[#0A0A0A]">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-2 w-5 h-5 text-[#99A1AF]" strokeWidth={1.67} />
                                    <input
                                        type="text"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 rounded-lg bg-[#F3F3F5] border border-transparent text-sm text-[#717182] focus:border-[#FF99C9] focus:outline-none"
                                    />
                                </div>
                            </div>
                            {/* Username */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm text-[#0A0A0A]">Username</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-2 text-base text-[#99A1AF]">@</span>
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 rounded-lg bg-[#F3F3F5] border border-transparent text-sm text-[#717182] focus:border-[#FF99C9] focus:outline-none"
                                    />
                                </div>
                            </div>
                            {/* Email */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm text-[#0A0A0A]">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-2 w-5 h-5 text-[#99A1AF]" strokeWidth={1.67} />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full pl-10 pr-10 py-2 rounded-lg bg-[#F3F3F5] border border-transparent text-sm text-[#717182] focus:border-[#FF99C9] focus:outline-none"
                                    />
                                </div>
                            </div>
                            {/* Phone */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm text-[#0A0A0A]">Phone Number</label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-2 w-5 h-5 text-[#99A1AF]" strokeWidth={1.67} />
                                    <input
                                        type="tel"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 rounded-lg bg-[#F3F3F5] border border-transparent text-sm text-[#717182] focus:border-[#FF99C9] focus:outline-none"
                                    />
                                </div>
                            </div>
                            {/* Location */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm text-[#0A0A0A]">Location</label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-2 w-5 h-5 text-[#99A1AF]" strokeWidth={1.67} />
                                    <input
                                        type="text"
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 rounded-lg bg-[#F3F3F5] border border-transparent text-sm text-[#717182] focus:border-[#FF99C9] focus:outline-none"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* About Me */}
                    <div className="bg-white rounded-[14px] border border-[rgba(0,0,0,0.10)] p-6 flex flex-col gap-2">
                        <h3 className="text-base text-[#0A0A0A]">About Me</h3>
                        <textarea
                            value={aboutMe}
                            onChange={(e) => setAboutMe(e.target.value)}
                            rows={4}
                            maxLength={250}
                            className="w-full px-3 py-2 rounded-lg bg-[#F3F3F5] border border-transparent text-sm text-[#717182] leading-5 focus:border-[#FF99C9] focus:outline-none resize-none"
                        />
                        <p className="text-base text-[#6A7282]">{aboutMe.length} characters</p>
                    </div>

                    {/* Photos */}
                    <div className="bg-white rounded-[14px] border border-[rgba(0,0,0,0.10)] p-6 flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-base text-[#0A0A0A]">Photos</h3>
                            <button onClick={() => fileInputRef.current?.click()} className="flex items-center cursor-pointer gap-2.5 px-2.5 py-1 rounded-lg hover:bg-[#F8F7F9] transition-colors">
                                <Plus className="w-4 h-4 text-[#FF99C9]" />
                                <span className="text-sm text-[#FF99C9]">Add Photo</span>
                            </button>
                        </div>
                        <input ref={fileInputRef} type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                        <div className="flex flex-wrap gap-2">
                            {photos.map((photo, index) => (
                                <div
                                    key={index}
                                    className="relative w-[181px] h-[181px] rounded-lg overflow-hidden max-[426px]:w-[105px] max-[426px]:h-[105px] max-[376px]:w-[90px] max-[376px]:h-[90px] max-[321px]:w-[70px] max-[321px]:h-[70px]"
                                >
                                    <Image
                                        src={photo}
                                        alt={`Photo ${index + 1}`}
                                        width={181}
                                        height={181}
                                        className="object-cover w-full h-full max-[426px]:h-[105px] max-[376px]:h-[90px] max-[321px]:h-[70px]"
                                    />
                                    <button
                                        onClick={() => removePhoto(index)}
                                        className="absolute top-1 right-1 w-5 h-5 bg-[#FB2C36] rounded-full flex items-center justify-center shadow-lg hover:bg-[#FB2C36]/90 transition-colors"
                                    >
                                        <X className="w-3 h-3 text-white" strokeWidth={2} />
                                    </button>
                                </div>
                            ))}

                            {photos.length < 12 && (
                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="w-[181px] h-[181px] rounded-lg border-[1.4px] border-[#D1D5DC] flex items-center justify-center hover:bg-[#F8F7F9] transition-colors max-[426px]:w-[105px] max-[426px]:h-[105px] max-[376px]:w-[90px] max-[376px]:h-[90px] max-[321px]:w-[70px] max-[321px]:h-[70px]"
                                >
                                    <Plus className="w-5 h-5 text-[#99A1AF]" />
                                </button>
                            )}
                        </div>

                        <p className="text-base text-[#6A7282]">Add up to 12 photos to showcase your work</p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pb-6">
                        <button onClick={handleCancel} className="flex-1 py-2 border cursor-pointer border-[rgba(0,0,0,0.10)] bg-white rounded-lg hover:bg-[#F8F7F9] transition-colors">
                            <span className="text-sm text-[#0A0A0A]">Cancel</span>
                        </button>
                        <button onClick={handleSave} className="flex-1 py-2 bg-[#FF99C9] cursor-pointer rounded-lg hover:bg-[#FF99C9]/90 transition-colors">
                            <span className="text-sm text-[#303A2B]">Save Changes</span>
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
