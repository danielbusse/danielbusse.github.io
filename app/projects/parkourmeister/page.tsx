import { ArticleLayout, ArticleHeader, ArticleBody } from '@/components/article';
import { getProject } from '@/utils/getProject';
import ParkourmeisterContent from '@/content/projects/parkourmeister';

export default function Parkourmeister() {
    const project = getProject('parkourmeister');

    if (!project) {
        return <div>Project not found</div>;
    }

    return (
        <ArticleLayout>
            <ArticleHeader
                title={project.title}
                period={project.period}
                tags={project.tags}
            />
            <ArticleBody content={<ParkourmeisterContent />} />
        </ArticleLayout>
    );
}
