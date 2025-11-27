'use client'
import { useState } from "react";
import { Upload, MessageSquare, Phone, Video, Info, Check, ChevronDown, X } from "lucide-react";
import NavigateBack from "@/components/NavigateBack";
import { useRouter } from "next/navigation";
import { FileUpload } from "@/components/FileUpload";
import { NumericStepper } from "@/components/NumericStepper";
import { RadioButton } from "@/components/RadioButton";
import { ToggleSwitch } from "@/components/ToggleSwitch";

const durations = ["1 day", "3 days", "7 days", "14 days", "30 days"];
const slaOptions = ["5m", "15m", "30m", "1h", "3h", "6h", "12h", "24h"];

export default function CreatePackage() {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [thumbnail, setThumbnail] = useState<string>("");
    const [duration, setDuration] = useState("");
    const [showDurationDropdown, setShowDurationDropdown] = useState(false);

    const [textMessages, setTextMessages] = useState(true);
    const [unlimitedMessages, setUnlimitedMessages] = useState(true);

    const [voiceCalls, setVoiceCalls] = useState(true);
    const [voiceCallsCount, setVoiceCallsCount] = useState(3);
    const [voiceCallMinutes, setVoiceCallMinutes] = useState(5);

    const [videoCalls, setVideoCalls] = useState(true);
    const [videoCallsCount, setVideoCallsCount] = useState(1);
    const [videoCallMinutes, setVideoCallMinutes] = useState(2);

    const [sla, setSla] = useState("1h");
    const [price, setPrice] = useState("");
    const [visibility, setVisibility] = useState<"draft" | "published" | "unlisted">("draft");
    const [tagInput, setTagInput] = useState("");
    const [tags, setTags] = useState<string[]>([]);

    const handleFileSelect = (file: File) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setThumbnail(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const handleAddTag = () => {
        if (tagInput.trim() && !tags.includes(tagInput.trim())) {
            setTags([...tags, tagInput.trim()]);
            setTagInput("");
        }
    };

    const calculateEarnings = () => {
        const priceNum = parseFloat(price) || 0;
        const platformFee = priceNum * 0.15;
        const stripeFee = priceNum * 0.029 + 0.30;
        const earnings = Math.max(0, priceNum - platformFee - stripeFee);
        return earnings.toFixed(2);
    };

    const handleSave = () => {
        console.log("Saving package...", {
            title,
            description,
            thumbnail,
            duration,
            textMessages,
            unlimitedMessages,
            voiceCalls,
            voiceCallsCount,
            voiceCallMinutes,
            videoCalls,
            videoCallsCount,
            videoCallMinutes,
            sla,
            price,
            visibility,
            tags,
        });
        router.push("/my-packages");
    };

    return (
        <div className="min-h-screen">
            <header className="bg-white border-b border-[#f0eff4] shadow-[0_2px_8px_rgba(0,0,0,0.04)] sticky top-0 z-50">
                <div className="max-w-[640px] mx-auto px-4 sm:px-0 py-4 flex items-center justify-between">
                    <NavigateBack />
                    <h1 className="font-roboto font-medium text-[18px] leading-7 text-black">
                        Create Package
                    </h1>
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-[#FF99C9] cursor-pointer rounded-md hover:bg-[#FF99C9]/90 transition-colors"
                    >
                        <span className="text-base text-[#303A2B]">Save Draft</span>
                    </button>
                </div>
            </header>

            <main className="max-w-[640px] mx-auto px-4 sm:px-0 py-6 pb-24">
                <div className="space-y-4">
                    <div className="bg-white rounded-2xl border border-[#C1BDDB] shadow-sm p-5">
                        <div className="space-y-2">
                            <label className="block text-base text-[#303A2B]">Package Title</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="e.g., Daily Chat with Sarah"
                                className="w-full px-4 py-3 border-2 border-[#C1BDDB] rounded-2xl text-base text-[#303A2B80] placeholder:text-green-dark/50 focus:border-[#A2C7E5] focus:outline-none"
                            />
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-[#C1BDDB] shadow-sm p-5">
                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                <Upload className="w-5 h-5 text-[#303A2B]" />
                                <h3 className="text-base text-[#303A2B]">Package Thumbnail</h3>
                            </div>
                            <p className="text-sm text-[#606060]">
                                Add an eye-catching image for your package
                            </p>
                            <FileUpload onFileSelect={handleFileSelect} preview={thumbnail} />
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-[#C1BDDB] shadow-sm p-5">
                        <div className="space-y-2">
                            <label className="block text-base text-[#303A2B]">Description</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Describe what buyers will get with this package..."
                                rows={5}
                                className="w-full px-4 py-3 border-2 border-[#C1BDDB] rounded-2xl text-base text-[#303A2B80] placeholder:text-[#303A2B80] focus:border-[#A2C7E5] focus:outline-none resize-none"
                            />
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-[#C1BDDB] shadow-sm p-5">
                        <div className="space-y-2">
                            <label className="block text-base text-[#303A2B]">Package Duration</label>
                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() => setShowDurationDropdown(!showDurationDropdown)}
                                    className="w-full px-4 py-3 border-2 border-[#B0C7DE] rounded-2xl text-base cursor-pointer text-[#303A2B80] text-left flex items-center justify-between focus:border-[##A2C7E5] focus:outline-none"
                                >
                                    <span className={duration ? "" : "text-green-dark/50"}>
                                        {duration || "Select duration..."}
                                    </span>
                                    <ChevronDown className="w-5 h-5 text-green-dark" />
                                </button>
                                {showDurationDropdown && (
                                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border-2 border-[#B0C7DE] scrollbar-hidden rounded-2xl shadow-lg z-10 max-h-60 overflow-y-auto">
                                        {durations.map((d) => (
                                            <button
                                                key={d}
                                                type="button"
                                                onClick={() => {
                                                    setDuration(d);
                                                    setShowDurationDropdown(false);
                                                }}
                                                className="w-full px-5 py-3 text-left text-base text-[#303A2B80] hover:bg-gray-100 cursor-pointer hover:text-gray-900 transition-colors"
                                            >
                                                {d}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-[#C1BDDB] shadow-sm p-5">
                        <h3 className="text-lg text-[#303A2B] mb-4">Entitlements</h3>
                        <div className="space-y-4">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <MessageSquare className="w-5 h-5 text-[#303A2B" />
                                        <span className="text-base text-[#303A2B]">Text Messages</span>
                                    </div>
                                    <ToggleSwitch
                                        checked={textMessages}
                                        onChange={setTextMessages}
                                    />
                                </div>
                                {textMessages && (
                                    <label className="flex items-center gap-3 ml-8">
                                        <div
                                            className={`w-7 h-7 rounded-lg flex items-center justify-center cursor-pointer transition-colors ${unlimitedMessages ? "bg-[#FF99C9]" : "bg-white border-2 border-gray-500"
                                                }`}
                                            onClick={() => setUnlimitedMessages(!unlimitedMessages)}
                                        >
                                            {unlimitedMessages && (
                                                <Check className="w-5 h-5 text-[#000000]" strokeWidth={1.5} />
                                            )}
                                        </div>
                                        <span className="text-base text-[#303A2B]">Unlimited messages</span>
                                    </label>
                                )}
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Phone className="w-5 h-5 text-[#303A2B]" />
                                        <span className="text-base text-[#303A2B]">Voice Calls</span>
                                    </div>
                                    <ToggleSwitch
                                        checked={voiceCalls}
                                        onChange={setVoiceCalls}
                                    />
                                </div>
                                {voiceCalls && (
                                    <div className="ml-8 flex items-center gap-12 md:gap-24 flex-wrap">
                                        <NumericStepper
                                            value={voiceCallsCount}
                                            onChange={setVoiceCallsCount}
                                            min={0}
                                            max={50}
                                            label="calls"
                                        />
                                        <NumericStepper
                                            value={voiceCallMinutes}
                                            onChange={setVoiceCallMinutes}
                                            min={0}
                                            max={120}
                                            label="minutes per call"
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="space-y-4 pb-10">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Video className="w-5 h-5 text-[#303A2B]" />
                                        <span className="text-base text-[#303A2B]">Video Calls</span>
                                    </div>
                                    <ToggleSwitch
                                        checked={videoCalls}
                                        onChange={setVideoCalls}
                                    />
                                </div>
                                {videoCalls && (
                                    <div className="ml-8 flex items-center gap-12 md:gap-24 flex-wrap">
                                        <NumericStepper
                                            value={videoCallsCount}
                                            onChange={setVideoCallsCount}
                                            min={0}
                                            max={50}
                                            label="calls"
                                        />
                                        <NumericStepper
                                            value={videoCallMinutes}
                                            onChange={setVideoCallMinutes}
                                            min={0}
                                            max={120}
                                            label="minutes per call"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-[#C1BDDB] shadow-sm p-5">
                        <h3 className="text-lg text-[#303A2B] mb-2">
                            Response Time Guarantee (SLA)
                        </h3>
                        <p className="text-sm text-[#C1BDDB] mb-2">
                            Maximum time to respond to messages
                        </p>
                        <div className="grid grid-cols-4 gap-2">
                            {slaOptions.map((option) => (
                                <button
                                    key={option}
                                    type="button"
                                    onClick={() => setSla(option)}
                                    className={`py-2 px-4 rounded-2xl cursor-pointer border-2 text-base text-center transition-colors ${sla === option
                                        ? "border-[#FF99C9] bg-[#FF99C9] text-[#303A2B]"
                                        : "border-[#C1BDDB] bg-white text-[#303A2B] hover:border-[#bdb8dc]"
                                        }`}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-[#C1BDDB] shadow-sm p-5">
                        <h3 className="text-lg text-[#303A2B] mb-4">Price & Earnings</h3>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="block text-base text-[#303A2B">Package Price</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-base text-[#303A2B]">
                                        $
                                    </span>
                                    <input
                                        type="number"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        placeholder="0.00"
                                        step="0.01"
                                        min="0"
                                        className="w-full pl-8 pr-4 py-3 border-2 border-[#C1BDDB] rounded-2xl text-base text-[#303A2B] placeholder:text-[#303A2B80] focus:border-[#A2C7E5] focus:outline-none"
                                    />
                                </div>
                            </div>
                            <div className="bg-[#F8F7F9] rounded-2xl p-4">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-base text-[#303A2B]">
                                        You earn: ${calculateEarnings()}
                                    </span>
                                    <button
                                        type="button"
                                        className="p-1 hover:bg-gray-200 rounded transition-colors"
                                    >
                                        <Info className="w-4 h-4 text-[#A2C7E5]" />
                                    </button>
                                </div>
                                <p className="text-sm text-[#606060]">
                                    After platform fee + Stripe fees
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-[#C1BDDB] shadow-sm p-5">
                        <h3 className="text-lg text-[#303A2B] mb-4">Visibility</h3>
                        <div className="space-y-3">
                            <RadioButton
                                checked={visibility === "draft"}
                                onChange={() => setVisibility("draft")}
                                label="Draft"
                                description="Only visible to you. Not available for purchase."
                                name="visibility"
                                value="draft"
                            />
                            <RadioButton
                                checked={visibility === "published"}
                                onChange={() => setVisibility("published")}
                                label="Published"
                                description="Visible on your profile. Available for purchase."
                                name="visibility"
                                value="published"
                            />
                            <RadioButton
                                checked={visibility === "unlisted"}
                                onChange={() => setVisibility("unlisted")}
                                label="Unlisted"
                                description="Only accessible via direct link."
                                name="visibility"
                                value="unlisted"
                            />
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-[#C1BDDB] p-6">
                        <h3 className="text-xl font-bold text-[#303A2B] mb-4">Tags</h3>
                        <p className="text-sm text-[#606060] mb-4">
                            Add tags to help your buyers visualize the most important parts of the package
                        </p>
                        <div className="flex gap-2 mb-4">
                            <input
                                type="text"
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                onKeyPress={(e) => e.key === "Enter" && handleAddTag()}
                                placeholder="Example - Instant Besties"
                                className="flex-1 px-4 py-3 border border-[#C1BDDB] rounded-2xl text-base text-[#303A2B] placeholder:text-[#303A2B80] focus:border-[#A2C7E5] focus:outline-none"
                            />
                            <button
                                type="button"
                                onClick={handleAddTag}
                                disabled={!tagInput.trim()}
                                className="px-6 py-3 bg-[#FF99C9] cursor-pointer rounded-2xl text-base text-[#303A2B] hover:bg-[#FF99C9]/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                            >
                                Add
                            </button>
                        </div>
                        <div className="bg-[#F8F7F9] rounded-2xl p-6 min-h-[68px] flex items-center justify-center">
                            {tags.length === 0 ? (
                                <p className="text-sm text-[#A2C7E5] text-center">No tags added yet</p>
                            ) : (
                                <div className="flex flex-wrap gap-2 w-full">
                                    {tags.map((tag) => (
                                        <div
                                            key={tag}
                                            className="pl-3 pr-2 py-1.5 bg-[#FF99C9] rounded-full text-sm text-green-dark flex items-center gap-3"
                                        >
                                            {tag}
                                            <button
                                                type="button"
                                                onClick={() => setTags(tags.filter((t) => t !== tag))}
                                                className="hover:text-red-600 hover:bg-lime-50 rounded-full p-0.5 transition-colors cursor-pointer"
                                            >
                                                <X size={14} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            <div className="fixed bottom-0 left-0 right-0 bg-white border-t  border-[#C1BDDB] shadow-[0_-2px_8px_rgba(0,0,0,0.04)] z-50">
                <div className="max-w-[640px] mx-auto px-4 sm:px-0 py-4 flex items-center justify-end">
                    <button
                        onClick={handleSave}
                        className="px-7 py-2.5 cursor-pointer bg-[#FF99C9] rounded-2xl hover:bg-[#FF99C9]/90 transition-colors"
                    >
                        <span className="text-base text-[#303A2B]">Save Package</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
