package com.github.mechisama.cph.toolWindow
import com.intellij.openapi.project.Project
import com.intellij.openapi.wm.ToolWindow
import com.intellij.openapi.wm.ToolWindowFactory
import com.intellij.ui.content.ContentFactory
import com.intellij.openapi.util.Disposer
import com.intellij.ui.jcef.JBCefBrowser


class JudgeViewFactory : ToolWindowFactory {

    override fun createToolWindowContent(project: Project, toolWindow: ToolWindow) {
        val browser = JBCefBrowser()
        browser.loadURL("http://localhost:5677/webview/cph.judgeView")
        Disposer.register(project, browser)
        val content = ContentFactory.getInstance().createContent(browser.component, null, false)
        toolWindow.contentManager.addContent(content)
    }
}
