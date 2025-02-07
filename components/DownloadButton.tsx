'use client'

import React from "react"
import { Button } from "./ui/button"

const DownloadButton = () => {
    const handleDownload = () => {
        fetch('/api/generate-pdf')
        .then((response) => response.blob())
        .then((blob) => {
            const url = window.URL.createObjectURL(new Blob([blob]))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', 'file.pdf')
            document.body.appendChild(link)
            link.click()
            if (link.parentNode) {
                link.parentNode.removeChild(link)
            }
        })
        .catch((error) => {
            console.error(error)
        })


    }
    return (
        <Button onClick={handleDownload}>Download Data</Button>
    )
}

export default DownloadButton