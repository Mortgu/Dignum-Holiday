import Modal from "@/components/modal/modal.js";

export default function FeedbackModal() {
    return (
        <Modal>
            <h2 className="text-lg font-bold text-gray-800">Give Feedback</h2>
            <form className="mt-4 flex flex-col gap-4">
        <textarea
            className="border border-gray-300 rounded-lg p-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Your feedback..."
            rows={4}
        />
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
                >
                    Submit
                </button>
            </form>
        </Modal>
    );
}