import { ArticleLayout, ArticleHeader, ArticleBody } from '@/components/article';
import { getProject } from '@/utils/getProject';
import EditNote from '@/components/EditNote';
import Link from 'next/link';
import Image from 'next/image';

export default function Telematik() {
    const project = getProject('telematik');

    if (!project) {
        return null;
    }

    return (
        <ArticleLayout>
            <ArticleHeader title={project.title} period={project.period} tags={project.tags} />
            <ArticleBody>
                <EditNote />
                <p className="lead font-monospace">
                    The &quot;Telematikprojekt&quot; is a project in the curriculum of the telematics master on my university that stretches over two semesters with the first being the planning phase and the second being the development phase.
                </p>
                <p className="text-warning">
                    This page will be added in soon!
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center' }}>
                    <Image
                        src="/assets/1.png"
                        alt="Drone"
                        width={800}
                        height={600}
                        style={{ width: '100%', height: 'auto', maxWidth: '800px' }}
                    />
                    <div style={{ backgroundColor: '#6c757d', padding: '1rem', borderRadius: '0.25rem' }}>
                        <Image
                            src="/assets/2.png"
                            alt="Drone with labels"
                            width={800}
                            height={600}
                            style={{ width: '100%', height: 'auto', maxWidth: '800px' }}
                        />
                    </div>
                    <div style={{ backgroundColor: '#6c757d', padding: '1rem', borderRadius: '0.25rem' }}>
                        <Image
                            src="/assets/3.png"
                            alt="Drone with labels"
                            width={800}
                            height={600}
                            style={{ width: '100%', height: 'auto', maxWidth: '800px' }}
                        />
                    </div>
                </div>
            </ArticleBody>
        </ArticleLayout>
    );
}
