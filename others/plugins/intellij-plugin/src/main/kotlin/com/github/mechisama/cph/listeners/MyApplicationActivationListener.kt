package com.github.mechisama.cph.listeners

import com.intellij.openapi.application.ApplicationActivationListener
import com.intellij.openapi.fileEditor.FileEditorManagerEvent
import com.intellij.openapi.fileEditor.FileEditorManagerListener
import com.intellij.openapi.wm.IdeFrame
import io.javalin.Javalin
import kotlinx.serialization.json.Json
import kotlinx.serialization.encodeToString

internal class MyApplicationActivationListener : ApplicationActivationListener {
    private var done = false;
    override fun applicationActivated(ideFrame: IdeFrame) {
        if (done) return;
        done = true;
        Javalin.create(/*config*/)
            .sse("/events/activeFile") { client ->
                client.keepAlive()
                ideFrame.project!!.messageBus.connect().subscribe(
                    FileEditorManagerListener.FILE_EDITOR_MANAGER,
                    object : FileEditorManagerListener {
                        override fun selectionChanged(event: FileEditorManagerEvent) {
                            println("activeFile: " + event.newFile.canonicalPath)
                            client.sendEvent(
                                Json.encodeToString(
                                    event.newFile.canonicalPath
                                )
                            )
                        }
                    }
                )

            }
            .start(5678)
    }
}
