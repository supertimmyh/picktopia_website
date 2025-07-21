import React, { useEffect } from 'react';
import ContentTile from '../ContentTile';

const ProgramScheduleSection = ({ content }) => {
    useEffect(() => {
        // Load the Court Reserve script if it doesn't already exist
        if (!document.getElementById('court-reserve-script')) {
            const script = document.createElement('script');
            script.id = 'court-reserve-script';
            script.type = 'text/javascript';
            script.innerHTML = `
                var myEventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
                var myEventListener = window[myEventMethod];
                var myEventMessage = myEventMethod == "attachEvent" ? "onmessage" : "message";
                function onEventClick(eventId, occId) { }
                myEventListener(myEventMessage, function(e) {
                    switch (e.data.action) {
                        case "setHeight": {
                            var embedCodeId = e.data.embedCodeId;
                            if (embedCodeId != null && embedCodeId != '') {
                                var elements = document.getElementsByClassName('form-iframe-' + embedCodeId);
                                for (var i = 0; i < elements.length; i++) {
                                    elements[i].style.height = (e.data.height) + "px";
                                }
                            } else {
                                document.getElementById('form-iframe').height = (e.data.height) + "px";
                            }
                            break;
                        }
                        case "eventClick": {
                            var eventId = e.data.params.eventId;
                            var reservationId = e.data.params.reservtionId;
                            onEventClick(eventId, reservationId);
                            break;
                        }
                    }
                }, false);
            `;
            document.head.appendChild(script);
        }
    }, []);

    return (
        <ContentTile
            title={content?.title || "Program Schedule"}
            subtitle={content?.subtitle || "Join our vibrant community with a variety of programs designed for all skill levels."}
        >
            <div className="w-full mb-6">
                <iframe 
                    id="form-iframe" 
                    className="form-iframe-46866" 
                    src="https://widgets.courtreserve.com/Online/Public/EmbedCode/16040/46866" 
                    style={{
                        margin: 0, 
                        width: '100%', 
                        border: 'none', 
                        overflow: 'hidden',
                        minHeight: '600px'
                    }} 
                    title="Court Reserve Program Schedule"
                />
            </div>
        </ContentTile>
    );
};

export default ProgramScheduleSection;