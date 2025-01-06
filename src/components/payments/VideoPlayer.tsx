import React from "react";

const VideoPlayer = ({ url }: any) => {
    console.log(url)
    return (
        <div>
            <h3>Video Player</h3>
            <video src={url} controls style={{ width: "100%" }} />

        </div>
    )
};

export default VideoPlayer;
