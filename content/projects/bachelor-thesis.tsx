import EditNote from '@/components/EditNote';
import Image from 'next/image';

export default function BachelorThesisContent() {
    return (
        <>
            <EditNote />
            <p className="lead font-monospace">
                My bachelor&apos;s thesis was about &quot;Lane detection by a 3D camera in a Robotic Operating System with Open Computer Vision&quot;.
            </p>
            <p className="text-warning">
                This page will be added soon
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <Image
                        src="/assets/35.jpg"
                        alt="visualization of the detection"
                        width={400}
                        height={300}
                        style={{ width: '100%', height: 'auto' }}
                    />
                    <Image
                        src="/assets/37.jpg"
                        alt="visualization of the detection"
                        width={400}
                        height={300}
                        style={{ width: '100%', height: 'auto' }}
                    />
                    <Image
                        src="/assets/39.jpg"
                        alt="visualization of the detection"
                        width={400}
                        height={300}
                        style={{ width: '100%', height: 'auto' }}
                    />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <Image
                        src="/assets/36.jpg"
                        alt="visualization of the detection"
                        width={400}
                        height={300}
                        style={{ width: '100%', height: 'auto' }}
                    />
                    <Image
                        src="/assets/38.jpg"
                        alt="visualization of the detection"
                        width={400}
                        height={300}
                        style={{ width: '100%', height: 'auto' }}
                    />
                    <Image
                        src="/assets/40.jpg"
                        alt="visualization of the detection"
                        width={400}
                        height={300}
                        style={{ width: '100%', height: 'auto' }}
                    />
                </div>
            </div>
        </>
    );
}