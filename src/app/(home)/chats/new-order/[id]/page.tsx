'use client'
import { AcceptOrderDialog } from "@/components/Dialogs/AcceptOrderDialog";
import { DeclineOrderDialog } from "@/components/Dialogs/DeclineOrderDialog";
import NavigateBack from "@/components/NavigateBack";
import useToggle from "@/lib/hooks/useToggle";
import { MessageCircle, Phone, Video, Clock, MapPin, Instagram, Twitter } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function NewOrder() {
  const toggleDecline = useToggle()
  const toggleAccept = useToggle()
  const router = useRouter()
  const packageData = {
    name: "Boyfriend",
    description: "The ultimate boyfriend experience with full access and priority support.",
    price: 349,
    duration: "30 days",
    features: [
      {
        icon: MessageCircle,
        label: "Messages",
        value: "Unlimited",
      },
      {
        icon: Phone,
        label: "Voice Calls",
        value: "Unlimited",
      },
      {
        icon: Video,
        label: "Video Calls",
        value: "5 calls",
      },
      {
        icon: Clock,
        label: "SLA",
        value: "15m reply",
      },
    ],
  };

  const buyerData = {
    name: "Tim Anderson",
    age: 28,
    location: "San Francisco, CA",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/fa15e10fc6e3f9935328d84c051c23bc0c8038c9?width=160",
    instagram: "@timanderson",
    twitter: "@timtech",
    bio: "Hey! I'm Tim, a software engineer living in SF. I love hiking, photography, and trying new restaurants. Looking for genuine connections and interesting conversations. I'm an active listener and love getting to know new people!",
    interests: ["Photography", "Hiking", "Cooking", "Tech", "Travel", "Music"],
    photos: [
      "https://api.builder.io/api/v1/image/assets/TEMP/29e4d13bbe522e4cdef727330702ff613b22e9e3?width=384",
      "https://api.builder.io/api/v1/image/assets/TEMP/d02476dafe54ed69bbc63cf145ababf12d9aecbd?width=384",
      "https://api.builder.io/api/v1/image/assets/TEMP/f05a54f936341e0d0b9922bec13d9cefe28b4bb4?width=384",
      "https://api.builder.io/api/v1/image/assets/TEMP/9124b0097d217072bf01355322786bb095f48088?width=384",
      "https://api.builder.io/api/v1/image/assets/TEMP/841d7fff2a730e6b4d2401f84e3b687a3b7f6008?width=384",
      "https://api.builder.io/api/v1/image/assets/TEMP/16ffb937344fa34e3680531a2b907bd2618d870e?width=384",
    ],
  };


  return (
    <div className="min-h-screen bg-[#F8F7F9]">
      <header className="bg-white border-b border-[#C1BDDB] shadow-[0_2px_4px_0_rgba(0,0,0,0.02)] sticky top-0 z-10">
        <div className="max-w-[640px] mx-auto px-4 sm:px-0 py-3">
          <div className="flex items-center gap-3">
            <NavigateBack />
            <div className="flex flex-col">
              <h1 className="text-base font-bold text-[#FF99C9] leading-6">
                NEW ORDER
              </h1>
              <p className="text-xs text-[#484848] leading-4">
                Package Purchase Request
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[640px] mx-auto px-4 sm:px-0 py-4 space-y-4 pb-20">
        <div className="bg-white rounded-2xl shadow-[0_2px_8px_0_rgba(0,0,0,0.06)] p-6 space-y-4">
          <div className="flex justify-between items-start gap-4">
            <div className="space-y-1 flex-1">
              <p className="text-xs font-bold text-[#484848] uppercase tracking-wide leading-4">
                Package Requested
              </p>
              <h2 className="text-xl font-bold text-[#FF99C9] leading-7">
                {packageData.name}
              </h2>
              <p className="text-sm text-[#303A2B] leading-5">
                {packageData.description}
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-[#303A2B] leading-8">
                ${packageData.price}
              </p>
              <p className="text-xs text-[#A2C7E5] leading-4">
                {packageData.duration}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {packageData.features.map((feature, index) => (
              <div
                key={index}
                className="bg-[#F8F7F9] rounded-lg px-3 py-3 flex items-center gap-2"
              >
                <feature.icon
                  className="w-4 h-4 text-[#FF99C9] shrink-0"
                  strokeWidth={1.33}
                />
                <div className="min-w-0">
                  <p className="text-xs text-[#A2C7E5] leading-4">
                    {feature.label}
                  </p>
                  <p className="text-sm font-bold text-[#303A2B] leading-5 truncate">
                    {feature.value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex sm:gap-3 gap-2 pt-4 border-t border-[#C1BDDB]">
            <button
              onClick={toggleDecline.open}
              className="flex-1 py-3 xs:px-4 rounded-[14px] cursor-pointer border-2 border-[#C1BDDB] bg-white text-base font-bold text-[#303A2B] leading-6 hover:bg-[#F8F7F9] transition-colors"
            >
              Decline
            </button>
            <button
              onClick={toggleAccept.open}
              className="flex-1 py-3 xs:px-4 rounded-[14px] cursor-pointer bg-[#FF99C9] text-base font-bold text-[#303A2B] leading-6 hover:bg-[#FF99C9]/90 transition-colors"
            >
              Accept Order
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-[0_2px_8px_0_rgba(0,0,0,0.06)] p-6 space-y-4">
          <p className="text-xs font-bold text-[#A2C7E5] uppercase tracking-wide leading-4">
            About the Buyer
          </p>

          <div className="flex items-center gap-4">
            <Image
              src={buyerData.image}
              alt={buyerData.name}
              width={80}
              height={80}
              className="w-20 h-20 rounded-full object-cover" //border-[3px] border-[#FF99C9]
            />
            <div className="flex-1 space-y-1">
              <h3 className="text-base font-bold text-[#303A2B] leading-6">
                {buyerData.name}, {buyerData.age}
              </h3>
              <div className="flex items-center gap-1 text-sm text-[#A2C7E5] leading-5">
                <MapPin className="w-4 h-4" strokeWidth={1.33} />
                <span>{buyerData.location}</span>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <div className="flex items-center gap-1 px-2 py-1 bg-[#F8F7F9] rounded">
                  <Instagram className="w-3 h-3 text-[#303A2B]" strokeWidth={1} />
                  <span className="text-xs text-[#303A2B] leading-4">
                    {buyerData.instagram}
                  </span>
                </div>
                <div className="flex items-center gap-1 px-2 py-1 bg-[#F8F7F9] rounded">
                  <Twitter className="w-3 h-3 text-[#303A2B]" strokeWidth={1} />
                  <span className="text-xs text-[#303A2B] leading-4">
                    {buyerData.twitter}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-bold text-[#303A2B] leading-5">Bio</h4>
            <p className="text-sm text-[#303A2B] leading-[22.75px]">
              {buyerData.bio}
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-bold text-[#303A2B] leading-5">
              Interests
            </h4>
            <div className="flex flex-wrap gap-2">
              {buyerData.interests.map((interest, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 bg-[#F8F7F9] border border-[#C1BDDB] rounded-full text-xs text-[#303A2B] leading-4"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-bold text-[#303A2B] leading-5">
              Photos
            </h4>
            <div className="grid grid-cols-3 gap-2">
              {buyerData.photos.map((photo, index) => (
                <div
                  key={index}
                  className="aspect-square rounded-lg overflow-hidden bg-gray-100"
                >
                  <Image
                    width={350}
                    height={350}
                    src={photo}
                    alt={`${buyerData.name} photo ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <AcceptOrderDialog
        open={toggleAccept.isOpen}
        onOpenChange={toggleAccept.toggle}
        buyerName="Tim Anderson"
        onAccept={() => {
          router.push('/new-chat'); 
          toggleAccept.close();    
        }}
        onCancel={toggleAccept.close}
      />
      <DeclineOrderDialog
        open={toggleDecline.isOpen}
        onOpenChange={toggleDecline.toggle}
        buyerName="Tim Anderson"
        onDecline={toggleDecline.close}
        onCancel={toggleDecline.close}
      />
    </div>
  );
}
