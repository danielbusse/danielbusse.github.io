import EditNote from '@/components/EditNote';
import Image from 'next/image';

export default function TelematikContent() {
    return (
        <>
            <p className="lead font-monospace">
                The &quot;Telematikprojekt&quot; was a two-semester project in the curriculum of the telematics master on my university. It involveved the designing, building and developing of an autonomous quadcopter to detect radiation. The project covered the entire systems engineering lifecycle, from the initial requirements definition and risk management to assembly, testing and final deployment.
            </p>
			<p> 
				The project had good success. We were able to build a flying quadcopter, that was able to detect radiation and send the data to a ground station. However, due to strict drone regulations in Germany and the limited time of the project, we were not able to actually make a sufficient flight test in a real environment. The project was a great opportunity to apply the knowledge gained in the telematics master program to a real-world problem and to work in a team of students with different specializations.
			</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
                <Image
                    src="/assets/1.png"
                    alt="Drone"
                    width={400}
                    height={300}
                    style={{ width: '50%', height: 'auto', maxWidth: '800px' }}
                />
            </div>

			<h3>System Engineering & Project Scope</h3>
			<p>
				The Project was split into two phases, one for each semester. The first phase was the planning and design phase.
			</p>
			<p>
				Phase 1 conducted full requirements engineering, authoring both the formal Lastenheft (stakeholder requirements) and Pflichtenheft (technical requirements). It also included risk management, system design and architecture, and the selection of components, sensors, software and frameworks as well as the procurement of components.
			</p>
			<p>
				Phase 2 conducted the construction, implementation, integration and testing of the quadcopter. It also included the development of custom software or integration frameworks for the quadcopter, its sensors and ground station.
			</p>


			<h3>Key Engineering challenges & Trade-offs</h3>
			<p>
				Time management was a key challenge in this project. The project had a strict deadline and the team had to work efficiently to complete the project on time. In the end the time was not sufficient to conduct a real flight test. Other challenges included the integration of ArduPilot, the flight controller, with the custom software for tracking and mapping sensor data. Another Challenge was the selection of components. Once the components were procured, there would not be enough time to buy other components or replacements in case of failure. This required careful consideration of the trade-offs between cost, performance, and reliability when selecting components.
			</p>

			<p>
				We decided to buy a quadcopter set from a vendor, which included the frame, motors, propellers and flight controller. This enabled us to have a quick setup of the base quadcopter and focus on the integration of the sensors and software. To integrate other hardware onto the frame we 3d printed custom mounts and cases to hold components like the radiation sensor, the camera or the battery. 
			</p>

			<h3>Outcome & Learnings</h3>

			<p>
				The project was a great opportunity to apply the knowledge gained in the telematics master program. We successfully built a prototype that was functional and met the requirements. Only the final test was unfortunately not possible. Every other test of hardware and components was successful. We met all mandatory requirements but missed some optional.
			</p>

			<p>
				This project was an overall great learning experience. It involved the complicated process of planning a complex endeveur like this. It also involved working with hardware and software at the same time and partly in areas we had no prior experience in. We learned a lot about the integration of different components and the challenges that come with it. We also learned a lot about project management, time management and teamwork.
			</p>

			<div style={{ padding: '0rem', borderRadius: '0.25rem' }}>
				<Image
					src="/assets/2.png"
					alt="Drone with labels"
					width={800}
					height={600}
					style={{ width: '75%', height: 'auto', maxWidth: '800px' }}
				/>
			</div>
			<div style={{ padding: '0rem', borderRadius: '0.25rem' }}>
				<Image
					src="/assets/3.png"
					alt="Drone with labels"
					width={800}
					height={600}
					style={{ width: '75%', height: 'auto', maxWidth: '800px' }}
				/>
			</div>
        </>
    );
}