import { ArticleLayout, ArticleHeader, ArticleBody } from '@/components/article';
import { getProject } from '@/utils/getProject';
import RonaldoContent from '@/content/projects/ronaldo';

export default function Ronaldo() {
    const project = getProject('ronaldo');

    if (!project) {
        return null;
    }

    return (
        <ArticleLayout>
            <ArticleHeader title={project.title} period={project.period} tags={project.tags} />
            <ArticleBody content={<RonaldoContent />} />
        </ArticleLayout>
    );
}
