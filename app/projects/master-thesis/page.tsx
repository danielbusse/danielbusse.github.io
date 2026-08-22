"use client";

import { ArticleLayout, ArticleHeader, ArticleBody } from '@/components/article';
import { getProject } from '@/utils/getProject';
import MasterThesisContent from '@/content/projects/master-thesis';

export default function MasterThesis() {
    const project = getProject('master-thesis');

    if (!project) {
        return null;
    }

    return (
        <ArticleLayout>
            <ArticleHeader title={project.title} period={project.period} tags={project.tags} />
            <ArticleBody content={<MasterThesisContent />} />
        </ArticleLayout>
    );
}
