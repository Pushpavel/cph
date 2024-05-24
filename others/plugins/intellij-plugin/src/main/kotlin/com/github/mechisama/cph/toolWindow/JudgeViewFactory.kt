package com.github.mechisama.cph.toolWindow

import com.github.mechisama.cph.services.CphBackend
import com.intellij.openapi.Disposable
import com.intellij.openapi.components.service
import com.intellij.openapi.project.DumbAware
import com.intellij.openapi.project.Project
import com.intellij.openapi.ui.SimpleToolWindowPanel
import com.intellij.openapi.wm.ToolWindow
import com.intellij.openapi.wm.ToolWindowFactory
import com.intellij.ui.jcef.JBCefBrowser
import com.intellij.ui.jcef.JBCefBrowserBuilder
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.launch
import java.awt.BorderLayout
import javax.swing.JPanel

class JudgeViewFactory : ToolWindowFactory, DumbAware {

    override fun createToolWindowContent(project: Project, toolWindow: ToolWindow) {
        val contentManager = toolWindow.contentManager
        val browser = JBCefBrowser()
        browser.loadHTML(
            """<html style="color-scheme: dark;">
                <body style="display: flex;align-items: center;justify-content: center;">
                    <h1>Loading...</h1>
                </body>
            </html>"""
        )
        val content = contentManager.factory.createContent(
            browser.component,
            null,
            false
        )
        contentManager.addContent(content)

        GlobalScope.launch {
            val backend = service<CphBackend>()
            val url = backend.getURL()
            browser.loadURL(url + "/webview/cph.judgeView?theme=dark")
        }

    }
}
