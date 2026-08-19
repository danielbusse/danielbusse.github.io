import { ArticleLayout, ArticleHeader, ArticleBody } from '@/components/article';
import { getProject } from '@/utils/getProject';
import NaolinoContent from '@/content/projects/naolino';

export default function Naolino() {
    const project = getProject('naolino');

    if (!project) {
        return null;
    }

    return (
        <ArticleLayout>
            <ArticleHeader title={project.title} period={project.period} tags={project.tags} />
            <ArticleBody content={<NaolinoContent />} />
        </ArticleLayout>
    );
}
