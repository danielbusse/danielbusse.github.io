import { ArticleLayout, ArticleHeader, ArticleBody } from '@/components/article';
import { getProject } from '@/utils/getProject';
import TelematikContent from '@/content/projects/telematik';

export default function Telematik() {
    const project = getProject('telematik');

    if (!project) {
        return null;
    }

    return (
        <ArticleLayout>
            <ArticleHeader title={project.title} period={project.period} tags={project.tags} />
            <ArticleBody content={<TelematikContent />} />
        </ArticleLayout>
    );
}
