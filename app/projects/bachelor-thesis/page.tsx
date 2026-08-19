import { ArticleLayout, ArticleHeader, ArticleBody } from '@/components/article';
import { getProject } from '@/utils/getProject';
import BachelorThesisContent from '@/content/projects/bachelor-thesis';

export default function BachelorThesis() {
    const project = getProject('bachelor-thesis');

    if (!project) {
        return null;
    }

    return (
        <ArticleLayout>
            <ArticleHeader title={project.title} period={project.period} tags={project.tags} />
            <ArticleBody content={<BachelorThesisContent />} />
        </ArticleLayout>
    );
}
