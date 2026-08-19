import Link from 'next/link';
import Image from 'next/image';
import EditNote from '@/components/EditNote';

export default function NaolinoContent() {
    return (
        <>
            <EditNote />
            <p className="lead font-monospace">
                This project emerged out of the Software Engineering II course of my Bachelor. Here we had to develop an algorithm for a task of choice to implement on the Nao robot. This Project is still (as of 2024) featured on the iCampus website of my university. You can find it <Link href="https://icampus.th-wildau.de/cms/roboticlab/studierendenprojekte" target="_blank" rel="noopener noreferrer" className="text-info">here</Link>.
            </p>
            <p>
                My project partner and I chose to double down on the field of image recognition and wanted to implement an algorithm to detect objects. Our Goal was to detect multiple different objects with different techniques. The first beeing template maching and the second a cascade classifier. We tried to detect three objects. The lock of the container the robot was stored in, an apple and a banana.
            </p>
            <Image
                src="/assets/nao.jpg"
                alt="The Nao we used, called Marvin"
                width={800}
                height={600}
                style={{ width: '100%', height: 'auto' }}
            />
            <p>
                We tried to detect the lock by using template matching from opencv. This is a technique where you try to find a template in an image by moving it over the image and find spots that match the template. You can see the template and a result of the matching below.
            </p>
            <Image
                src="/assets/lock_template.jpg"
                alt="Template of the Lock for template maching"
                width={400}
                height={300}
                style={{ width: '50%', height: 'auto', display: 'block', margin: '1rem auto' }}
            />
            <Image
                src="/assets/lock_template_detected.png"
                alt="Lock detected by template maching"
                width={800}
                height={600}
                style={{ width: '100%', height: 'auto' }}
            />
            <p>
                For detecting the fruits we tried to train a cascade classifier from opencv on images we provided ourselves. We created a positives/negatives dataset for the classiefier to train on. For training we used my home computer with a GPU. This was not a very good idea that did cost us a lot of our project time. We would have been able to use ressources of our university but didn&apos;t think about asking. We also could have used an existing datasets with huge amounts of data. But we underestimated the time needed for training and the necessity of a lot of data for training.
            </p>
            <p>
                The result of the project is mixed. We did get template maching to work easy and relatively reliable. However, we were not be able to train the cascade classifier to detect objects reliably. The results where ambiguous and were higly dependent on luck to detect an object correctly. This was due to our lack of experience on the topic. We had not collected enough Data and only used our personal hardware to train the classifer.
            </p>
            <p>
                We were able to detect objects in the end because we used multiple techniques. We consider this project still a success because we have learned a lot not only about object detection but also on how to approach a unknown and difficult topic. If you are interested in the results you can find a small recorded snippet of the presentation below.
            </p>
            <p className="fst-italic">
                (The video was cut a little weird by iCampus, but the detection of the apple was successful in the second try, after the cut. You can hardly hear the Nao say &quot;Apfel habe ich links gefunden.&quot;)
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem 0' }}>
                <iframe
                    width="560"
                    height="315"
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