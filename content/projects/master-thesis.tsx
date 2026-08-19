import EditNote from '@/components/EditNote';

export default function MasterThesisContent() {
    return (
        <>
            <EditNote />
            <p className="lead font-monospace">
                My master&apos;s thesis is about &quot;Image Data Curation in the Agricultural Domain: Using Deep Neural Networks and Image-Text-Alignment&quot;.
            </p>
            <p className="text-warning">
                This page will be added soon
            </p>
        </>
    );
}