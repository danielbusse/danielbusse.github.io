import Link from 'next/link';
import Image from 'next/image';
import EditNote from '@/components/EditNote';

export default function NaolinoContent() {
    return (
        <>
            <EditNote />
            <p className="lead font-monospace">
                This project was part of the Software Engineering II course during my bachelor&apos;s degree. We had to develop an algorithm for a task of our choice and implement it on the NAO robot. As of 2026, the project was still featured on my university&apos;s iCampus website. You can find it <Link href="https://icampus.th-wildau.de/cms/roboticlab/studierendenprojekte" target="_blank" rel="noopener noreferrer" className="text-info">here</Link>.
            </p>
            <h3>Getting to Know the NAO</h3>
            <p>
                The lab began with a guided exercise to familiarize us with the robot. We followed a set of instructions to make the NAO perform a short dance, which gave us practical experience using its onboard sensors and actuators before moving on to the open-ended project.
            </p>
            <p>
                My project partner and I chose to focus on image recognition and object detection. We explored two approaches independently: template matching and a cascade classifier. Our targets were the lock of the container where the robot was stored, an apple, and a banana.
            </p>
            <figure style={{ maxWidth: '30rem', margin: '1.5rem auto 2rem' }}>
                <Image
                    src="/assets/nao.jpg"
                    alt="The NAO robot we used, called Marvin"
                    width={800}
                    height={600}
                    style={{ width: '100%', height: '16rem', objectFit: 'contain', display: 'block', margin: 0 }}
                />
                <figcaption style={{ textAlign: 'center', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                    Marvin, the NAO robot used for the project.
                </figcaption>
            </figure>
            <h3>Template Matching</h3>
            <p>
                We used OpenCV template matching to detect the lock. The algorithm moves a reference image, or template, across a camera image and looks for regions that match it. This approach was straightforward to implement and worked relatively reliably in our tests. The reference template and an example detection are shown below.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 16rem), 1fr))', gap: '1rem', maxWidth: '56rem', margin: '1.5rem auto 2rem' }}>
                <figure style={{ margin: 0 }}>
                    <Image
                        src="/assets/lock_template.jpg"
                        alt="Reference template of the lock"
                        width={400}
                        height={300}
                        style={{ width: '100%', height: '14rem', objectFit: 'contain', display: 'block', margin: 0 }}
                    />
                    <figcaption style={{ textAlign: 'center', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                        Reference template
                    </figcaption>
                </figure>
                <figure style={{ margin: 0 }}>
                    <Image
                        src="/assets/lock_template_detected.png"
                        alt="Lock detected by template matching"
                        width={800}
                        height={600}
                        style={{ width: '100%', height: '14rem', objectFit: 'contain', display: 'block', margin: 0 }}
                    />
                    <figcaption style={{ textAlign: 'center', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                        Lock located in the camera image
                    </figcaption>
                </figure>
            </div>
            <h3>Cascade Classifier</h3>
            <p>
                To detect the fruit, we trained an OpenCV cascade classifier using images we collected ourselves and organized into positive and negative samples. We recorded the training footage with a smartphone, while live detection used the NAO&apos;s onboard camera. The difference between those cameras may have contributed to the classifier&apos;s inconsistent results.
            </p>
            <p>
                Training on my home computer, even with a GPU, took a lot of project time. We could have asked to use university resources or started with an existing dataset, but we underestimated both the time training would take and how much data a reliable classifier needed. In the end, its detections were ambiguous and inconsistent. Our limited experience and dataset were major challenges.
            </p>
            <h3>Finite State Machine</h3>
            <p>
                The NAO stayed in front of a box, with objects placed to its left, in the center, or to its right. Its behavior followed three states: scan for an object, orient its head toward the detected position, then point and announce the result. The NAO used text-to-speech to identify the object and its position, as heard in the presentation clip below.
            </p>
            <h3>Outcome &amp; Learnings</h3>
            <p>
                The project had mixed results: template matching worked relatively reliably, while the cascade classifier did not. Exploring both approaches independently gave us a working detection method despite the classifier&apos;s limitations. We consider the project a success because we learned not only about object detection, but also how to approach an unfamiliar and difficult problem.
            </p>
            <p className="fst-italic">
                The iCampus edit cuts the clip before the apple is detected successfully on the second attempt. The NAO&apos;s announcement, &quot;Apfel habe ich links gefunden&quot; (&quot;I found an apple on the left&quot;), is faintly audible.
            </p>
            <div style={{ width: '100%', maxWidth: '560px', aspectRatio: '16 / 9', margin: '2rem auto' }}>
                <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube-nocookie.com/embed/J_lsKlnu7mg?si=mWkvYRX2Q44YdHAU"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                ></iframe>
            </div>
        </>
    );
}