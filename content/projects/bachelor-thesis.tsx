import Image from 'next/image';
import styles from './bachelor-thesis.module.scss';

const resultStages = [
    {
        title: '1. Road regions from the stereo views',
        description: 'The road-focused regions of interest (ROIs) extracted from the left and right camera images.',
        images: [
            { src: '/assets/39.jpg', alt: 'Road region of interest from the left ZED 2 camera image' },
            { src: '/assets/40.jpg', alt: 'Road region of interest from the right ZED 2 camera image' },
        ],
    },
    {
        title: '2. Lane boundaries from ROI edges',
        description: 'Canny and HoughLinesP candidates after filtering for the left and right lane boundaries.',
        images: [
            { src: '/assets/37.jpg', alt: 'ROI-based lane boundary candidates from the left camera image' },
            { src: '/assets/38.jpg', alt: 'ROI-based lane boundary candidates from the right camera image' },
        ],
    },
    {
        title: '3. Lane boundaries from the grayscale mask',
        description: 'A mask of bright pixels in the grayscale image provides a second lane estimate to compare with the ROI result.',
        images: [
            { src: '/assets/35.jpg', alt: 'Grayscale-mask lane estimate from the left camera image' },
            { src: '/assets/36.jpg', alt: 'Grayscale-mask lane estimate from the right camera image' },
        ],
    },
];

export default function BachelorThesisContent() {
    return (
        <>
            <p className="lead font-monospace">
                My bachelor&apos;s thesis explored lane detection for a 1:14 scale vehicle using a ZED 2 stereo camera, ROS, and OpenCV. The goal was to estimate the lane and the vehicle&apos;s position within it, not to build a complete autonomous-driving system.
            </p>
            <h3>Vehicle, Camera, and ROS</h3>
            <p>
                The prototype used a ZED 2 stereo camera and an NVIDIA Jetson Nano as its onboard computer. The camera produced left and right color images, along with depth information. ROS connected the camera driver and the lane detector: the detector subscribed to the image topics, processed the latest pair in C++ with OpenCV, and published its lane estimate to a ROS topic.
            </p>
            <p>
                The stereo camera&apos;s depth capability was part of the original motivation, but the final detector did not process its point cloud. OpenCV could not directly handle the point-cloud format provided through ROS, and converting it into a usable representation was outside the implemented solution. Instead, the algorithm analyzed the two 2D camera views independently and combined their measurements. That distinction is important: this was stereo-camera lane detection, but not a depth- or point-cloud-based detector.
            </p>

            <h3>Four Approaches, One Practical Combination</h3>
            <p>
                I compared several ways to identify lane boundaries before settling on a combined image-processing strategy:
            </p>
            <ul className={styles.approachList}>
                <li><strong>Full-frame edges:</strong> blur a grayscale image, detect edges with Canny, and find lines with HoughLinesP. This also picked up irrelevant edges from the wider scene.</li>
                <li><strong>Perspective region of interest:</strong> transform a road-focused crop before edge and line detection, reducing interference from trees and other background objects.</li>
                <li><strong>Color filtering:</strong> restrict the search to colors associated with road markings. This can remove unrelated scene content, but is sensitive to exposure and shadows.</li>
                <li><strong>Stereo point cloud:</strong> use depth geometry to distinguish the road plane from objects. This remained an explored approach, not part of the final implementation.</li>
            </ul>
            <p>
                The final detector combined ROI-based line detection with a second line search on a brightness mask made from the grayscale image. The color-filtering approach was discussed as an option, but this grayscale mask is the one used in the implemented pipeline.
            </p>

            <figure className={styles.pipelineFigure}>
                <figcaption>Implemented lane-detection pipeline</figcaption>
                <ol className={styles.pipeline}>
                    <li className={styles.pipelineStep}>
                        <span>01</span>
                        <strong>Receive stereo images</strong>
                        <p>ROS supplies the latest left and right ZED 2 views.</p>
                    </li>
                    <li className={styles.pipelineStep}>
                        <span>02</span>
                        <strong>Analyze each view</strong>
                        <p>Crop and perspective-transform the road region.</p>
                    </li>
                    <li className={styles.pipelineStep}>
                        <span>03</span>
                        <strong>Detect line candidates</strong>
                        <p>Apply Canny edge detection, then find segments with HoughLinesP.</p>
                    </li>
                    <li className={styles.pipelineStep}>
                        <span>04</span>
                        <strong>Filter lane boundaries</strong>
                        <p>Filter HoughLinesP segments by angle and lower endpoint to identify left and right boundaries.</p>
                    </li>
                    <li className={styles.pipelineStep}>
                        <span>05</span>
                        <strong>Cross-check with a mask</strong>
                        <p>Find and filter lines on a grayscale brightness mask, then score agreement with the ROI result.</p>
                    </li>
                    <li className={styles.pipelineStep}>
                        <span>06</span>
                        <strong>Combine and publish</strong>
                        <p>Weight left/right estimates to calculate lane angle and offset, then publish through ROS.</p>
                    </li>
                </ol>
            </figure>

            <h3>How the Lane Estimate Was Built</h3>
            <p>
                For each image, the detector warped a fixed road region into a rectangular view, converted it to grayscale, and applied a Gaussian blur before Canny edge detection. HoughLinesP returned line segments from those edges. Candidate lines were filtered by their angle and their lower endpoint, which helped separate the expected left and right lane boundaries from unrelated lines. The accepted line positions and angles were averaged, with the expected boundary positions updated as new frames arrived.
            </p>
            <p>
                A second route created a binary mask from bright grayscale pixels, then repeated edge and line detection on that mask. The ROI and mask results were compared; their presence and agreement contributed to a confidence score. The same analysis ran on the left and right camera images. The detector then combined the two view-specific estimates, weighted by their scores, to calculate lane angle, lane width and center, and the camera&apos;s lateral offset from the lane center. If a frame produced no usable detection, it retained the previous boundary and angle estimates while waiting for better image data.
            </p>

            <h3>Detection Results</h3>
            <p>
                These three stages show one clear detection example from the thesis. The first pair shows the road ROIs from the left and right views. The second pair shows the lane lines retained from those ROIs after filtering. The third pair shows the separate line estimates obtained from the grayscale brightness masks. Comparing the two estimates for each view contributed to the detector&apos;s confidence score.
            </p>
            <div className={styles.resultGallery}>
                {resultStages.map((stage) => (
                    <figure className={styles.resultStage} key={stage.title}>
                        <figcaption>
                            <strong>{stage.title}</strong>
                            <span>{stage.description}</span>
                        </figcaption>
                        <div className={styles.imagePair}>
                            {stage.images.map((image) => (
                                <Image
                                    key={image.src}
                                    src={image.src}
                                    alt={image.alt}
                                    width={400}
                                    height={300}
                                    style={{ width: '100%', height: 'auto', display: 'block', margin: 0 }}
                                />
                            ))}
                        </div>
                    </figure>
                ))}
            </div>
            <p>
                In the clearest example, the detector estimated the lane angle at about 5.93 degrees to the right and placed the camera roughly 140 pixels, or about five percent of the lane width, left of the center. Its internal score was 160 points, described in the thesis as roughly 66 percent. That percentage was a subjective heuristic, not a calibrated probability of correctness.
            </p>
            <p>
                In a partially shadowed example, the left and right views produced estimates of different quality, so confidence weighting reduced the influence of the weaker side. Under severe overexposure, however, Canny missed parts of the lane markings and reflections introduced false edges. The brightness mask could not reliably validate those results, and the detector correctly failed to identify a lane with confidence.
            </p>

            <h3>Limitations and Future Work</h3>
            <p>
                The detector estimated lane geometry in clear, controlled footage, but its performance remained sensitive to illumination, image quality, manually specified line-angle criteria, and fixed regions of interest. Evaluation used prerecorded stereo video rather than the ROS recordings because lighting issues made some of the available ROS samples unsuitable for analysis. The results therefore demonstrate the feasibility of a perception prototype, not the validation of a live vehicle system.
            </p>
            <p>
                Combining ROI-based line estimates with the grayscale-mask results provided a means of cross-checking detections under favorable conditions. However, both methods remained vulnerable to exposure changes. The confidence score used to combine estimates was based on manually defined heuristics and was not statistically calibrated; it should therefore not be interpreted as a probability of correctness. Although the ZED 2 provides stereo depth data, point-cloud information was not incorporated into the implemented pipeline.
            </p>
            <p>
                Further development would benefit from camera-specific, adaptive regions of interest, more robust compensation for illumination variation, and point-cloud processing, for example with the Point Cloud Library, to incorporate road-plane and obstacle information. Evaluation across a broader range of lighting and road conditions would also be required to establish the detector&apos;s reliability and suitability for deployment.
            </p>
        </>
    );
}