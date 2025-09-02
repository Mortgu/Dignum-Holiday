import { useRouter } from "next/navigation";

export default function Modal({ children }) {
    const router = useRouter();

    return (
        <button
            onClick={() => router.back()}
            aria-label="Close"
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
        >button</button>
    )
}