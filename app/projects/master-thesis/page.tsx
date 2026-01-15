import { ArticleLayout, ArticleHeader, ArticleBody } from '@/components/article';
import { getProject } from '@/utils/getProject';
import EditNote from '@/components/EditNote';
import Link from 'next/link';
import Image from 'next/image';

export default function MasterThesis() {
    const project = getProject('master-thesis');

    if (!project) {
        return null;
    }

    return (
        <ArticleLayout>
            <ArticleHeader title={project.title} period={project.period} tags={project.tags} />
            <ArticleBody>
                <EditNote />
                <p className="lead font-monospace">
                    My master&apos;s thesis is about &quot;Image Data Curation in the Agricultural Domain: Using Deep Neural Networks and Image-Text-Alignment&quot;.
                </p>
                <p className="text-warning">
                    This page will be added soon
                </p>
            </ArticleBody>
        </ArticleLayout>
    );
}
