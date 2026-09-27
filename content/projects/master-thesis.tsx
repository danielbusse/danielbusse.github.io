import Button from '@/components/Button';
import Image from 'next/image';
import styles from './master-thesis.module.scss';

const thesisPdf = '/pdfs/Extended_Masterarbeit_Daniel-Busse_Telematik_2025_stylized.pdf';

const modelScores = [
    { stage: 'Zero-shot', vilt: 0.7, blip: 0.3 },
    { stage: 'Few-shot', vilt: 0.98, blip: 0.98 },
    { stage: 'Multi-shot', vilt: 1, blip: 0.999 },
];

export default function MasterThesisContent() {
    return (
        <>
            <p className="lead font-monospace">
                My master&apos;s thesis, <em>Image Data Curation in the Agricultural Domain: Using Deep Neural Networks and Image-Text Alignment</em>, was conducted with John Deere&apos;s Advanced Algorithms team. It explored whether vision-language models could help curate agricultural image datasets through natural-language queries.
            </p>
            <div className={styles.pdfAction}>
                <Button className={styles.pdfButton} href={thesisPdf} useTransition={false} target="_blank" rel="noopener noreferrer">
                    Read the Full Thesis
                </Button>
            </div>

            <h3>The Curation Problem</h3>
            <p>
                Harvesting operations produce large volumes of images over many seasons and field conditions. Finding a useful subset for a machine-learning dataset can require people to inspect images one by one. The thesis investigates a more direct workflow: describe the images you need in natural language, then rank or filter the dataset by how well each image matches that description.
            </p>
            <p>
                The target descriptions combine crop states such as standing crop, downcrop, disturbed crop, and stubble with environmental conditions such as shadows, dust, and time of day. A query might ask for images with a lot of disturbed crop, or combine crop and lighting conditions in one request.
            </p>

            <h3>From Field Data to Text Prompts</h3>
            <p>
                The data came from routine combine-harvester field tests across different seasons, regions, and times of day. Each usable sample paired an RGB image with a pixel-level crop-state mask and metadata. The mask identifies crop classes in the image; the metadata records environmental conditions such as dust, shadows, and daylight.
            </p>
            <figure className={styles.sampleFigure}>
                <div className={styles.sampleVisual}>
                    <Image
                        src="/assets/master-thesis-example-000.png"
                        alt="Field image collected from a combine harvester"
                        fill
                        sizes="(max-width: 700px) 100vw, 70vw"
                        className={styles.sampleBase}
                    />
                    <Image
                        src="/assets/master-thesis-example-001.png"
                        alt=""
                        aria-hidden="true"
                        fill
                        sizes="(max-width: 700px) 100vw, 70vw"
                        className={styles.sampleMask}
                    />
                </div>
                <figcaption>
                    One thesis example pairs the field image with a crop-state mask. Green marks standing crop, yellow marks downcrop, and red marks disturbed crop.
                </figcaption>
            </figure>
            <p>
                To turn the masks into language, I separated each class with OpenCV&apos;s <code>inRange</code>, extracted its outer contours with <code>findContours</code>, and estimated the size of each labeled region from its pixel area. Regions were described as small, medium, or large; very small regions were ignored. This changed a dense pixel mask into structured facts that could be used to describe an image.
            </p>
            <blockquote className={styles.promptExample}>
                <strong>Example prompt generated from the metadata</strong>
                <p>
                    The image contains one large area of standing crop, one medium area of disturbed crop, one small area of downcrop, daylight lighting condition with no shadows and no dust.
                </p>
            </blockquote>
            <p>
                Prompt generation combined rules with language-model refinement. The structured metadata supplied the facts; an LLM helped turn them into readable descriptions. Each image also received an inverted prompt describing contrasting conditions, creating positive and negative image-text pairs for training. The generation model did not inspect the image itself, so the prompt quality depended on the masks and metadata being accurate.
            </p>

            <figure className={styles.workflowFigure}>
                <figcaption>Research and data pipeline</figcaption>
                <ol className={styles.workflow}>
                    <li className={styles.workflowStep}>
                        <span>01</span>
                        <strong>Collect</strong>
                        <p>Harvester images, crop masks, and field metadata</p>
                    </li>
                    <li className={styles.workflowStep}>
                        <span>02</span>
                        <strong>Structure</strong>
                        <p>Convert mask regions into crop classes and size counts</p>
                    </li>
                    <li className={styles.workflowStep}>
                        <span>03</span>
                        <strong>Describe</strong>
                        <p>Generate a prompt and an inverted comparison prompt</p>
                    </li>
                    <li className={styles.workflowStep}>
                        <span>04</span>
                        <strong>Fine-tune</strong>
                        <p>Train ViLT and BLIP-2 to score matching pairs</p>
                    </li>
                    <li className={styles.workflowStep}>
                        <span>05</span>
                        <strong>Evaluate</strong>
                        <p>Test held-out pairs and realistic search prompts</p>
                    </li>
                </ol>
            </figure>

            <h3>Dataset Scale and Quality</h3>
            <p>
                The multi-shot dataset contains 986 samples, split into 691 training, 148 validation, and 147 test samples. The few-shot set is a 50-sample subset, with 36 training, 7 validation, and 7 test samples. The test split was held out from training.
            </p>
            <figure className={styles.datasetFigure}>
                <figcaption>Two training scales, each split into train, validation, and test sets</figcaption>
                <div className={styles.datasetRow}>
                    <div className={styles.datasetHeading}>
                        <strong>Few-shot subset</strong>
                        <span>50 samples</span>
                    </div>
                    <div className={styles.splitBar} aria-hidden="true">
                        <span className={styles.trainSegment} style={{ width: '72%' }} />
                        <span className={styles.validationSegment} style={{ width: '14%' }} />
                        <span className={styles.testSegment} style={{ width: '14%' }} />
                    </div>
                    <p className={styles.splitDetails}>Train 36 (72%) · Validation 7 (14%) · Test 7 (14%)</p>
                </div>
                <div className={styles.datasetRow}>
                    <div className={styles.datasetHeading}>
                        <strong>Multi-shot dataset</strong>
                        <span>986 samples</span>
                    </div>
                    <div className={styles.splitBar} aria-hidden="true">
                        <span className={styles.trainSegment} style={{ width: '70.1%' }} />
                        <span className={styles.validationSegment} style={{ width: '15%' }} />
                        <span className={styles.testSegment} style={{ width: '14.9%' }} />
                    </div>
                    <p className={styles.splitDetails}>Train 691 (70.1%) · Validation 148 (15%) · Test 147 (14.9%)</p>
                </div>
                <div className={styles.splitLegend} aria-label="Dataset split colors">
                    <span><i className={styles.trainSwatch} />Train</span>
                    <span><i className={styles.validationSwatch} />Validation</span>
                    <span><i className={styles.testSwatch} />Test</span>
                </div>
            </figure>
            <p>
                The dataset was small and unevenly distributed. Standing crop was the most common class, while downcrop appeared much less often; unknown pixels occupied about three quarters of the full image area. The images also tended to be dark and gray, with limited visual diversity. These properties made it harder to learn the less frequent crop states and meant strong test scores needed to be interpreted cautiously.
            </p>

            <h3>Prototype and Model Choices</h3>
            <p>
                Before the main experiments, I built a feasibility prototype using a CLIP-style setup: a pretrained ResNet-50 image encoder and BERT text encoder projected into a shared 512-dimensional space. Cosine similarity compared image and text embeddings. Tested on the Agriculture-Vision dataset, the prototype performed above random chance but was unreliable. That result motivated a more deliberate dataset, prompt, and fine-tuning pipeline.
            </p>
            <p>
                The main comparison focused on two pretrained models with different architectures. ViLT is a compact, joint vision-language transformer with about 111 million parameters. BLIP-2 is much larger, at about 1.2 billion parameters, and connects frozen vision and language encoders through a Q-Former. Both were adapted for image-text matching: given an image and a prompt, the model produces a score for whether they match.
            </p>
            <p>
                I fine-tuned each model on the 50-sample few-shot set and the 986-sample multi-shot set. Training used AdamW with a cosine-annealing learning-rate schedule. The experiments ran in Databricks on an AWS instance with eight NVIDIA A100 GPUs, which made it possible to train the larger BLIP-2 model.
            </p>

            <h3>Evaluation: Strong Test Scores, Weak Transfer</h3>
            <p>
                Evaluation had two parts. First, the models scored held-out test images against prompts that followed the same structured format used for training. I measured accuracy, ROC-AUC, contrastive gap between matching and inverted prompts, and inference time. Second, I tested more realistic queries whose wording or structure differed from the training template.
            </p>
            <figure className={styles.aucFigure}>
                <figcaption>Approximate ROC-AUC on the held-out test split</figcaption>
                <div className={styles.aucLegend}>
                    <span><i className={styles.viltSwatch} />ViLT</span>
                    <span><i className={styles.blipSwatch} />BLIP-2</span>
                </div>
                <div className={styles.aucRows}>
                    {modelScores.map(({ stage, vilt, blip }) => (
                        <div className={styles.aucRow} key={stage}>
                            <strong>{stage}</strong>
                            <div className={styles.aucMetric}>
                                <span>ViLT</span>
                                <div className={styles.meter} aria-hidden="true">
                                    <span className={styles.viltFill} style={{ width: `${vilt * 100}%` }} />
                                </div>
                                <b>{vilt.toFixed(2)}</b>
                            </div>
                            <div className={styles.aucMetric}>
                                <span>BLIP-2</span>
                                <div className={styles.meter} aria-hidden="true">
                                    <span className={styles.blipFill} style={{ width: `${blip * 100}%` }} />
                                </div>
                                <b>{blip.toFixed(3)}</b>
                            </div>
                        </div>
                    ))}
                </div>
                <p className={styles.chartNote}>
                    Fine-tuning sharply improved classification on unseen images with familiar prompt structure. These scores do not establish that a model understood the image-text relationship.
                </p>
            </figure>
            <p>
                On the held-out split, both models reached around 0.98 ROC-AUC after few-shot fine-tuning; multi-shot results were about 1.00 for ViLT and 0.999 for BLIP-2. ViLT was slightly faster at roughly 0.3 seconds per image-text pair, while BLIP-2 had a small edge on some matching metrics. Taken alone, these results look excellent.
            </p>

            <h3>Use-Case Prompts Exposed the Gap</h3>
            <p>
                The second evaluation asked a more practical question: could the models retrieve the right images when a user phrased a query differently from the training template? The answer was not reliably. A query for downcrop with shadows returned no true matches in the top results across the tested settings. A dust-only query was more promising for some configurations, but performance varied. Most revealingly, a detailed crop prompt with no matching images in the dataset still received very high scores after fine-tuning.
            </p>
            <p>
                This suggests the models learned the repeated prompt patterns and image-label associations well enough to classify examples drawn from the same setup, but did not demonstrate robust fine-grained semantic alignment. The high test-set ROC-AUC and weak use-case retrieval are not contradictory: they measure different kinds of generalization.
            </p>

            <h3>Caveats and Learnings</h3>
            <p>
                The dataset had fewer than the 1,000 samples targeted in its requirements, substantial label imbalance, limited visual diversity, and metadata that could describe only a region of interest rather than the whole image. Since prompts were generated from that metadata, any metadata error carried into the text. LLM refinement could also introduce hallucinations, and the prompts retained a highly consistent structure that may have encouraged pattern memorization.
            </p>
            <p>
                The central learning was methodological: excellent classification scores on a held-out split are not enough to claim useful image understanding. The use-case prompts revealed failure modes that the standard test metrics did not. The thesis therefore concludes that these models were not ready for real-world agricultural curation in this setup, while identifying fine-tuning as a promising direction. More varied data and prompts, and evaluations that test region-to-word alignment directly, would be needed to establish reliable semantic understanding.
            </p>
        </>
    );
}