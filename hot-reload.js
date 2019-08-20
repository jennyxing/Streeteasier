// taken from https://60devs.com/hot-reloading-for-chrome-extensions.html?source=post_page-----3da296916286----------------------

const filesInDirectory = dir => new Promise (resolve =>

    // https://developer.mozilla.org/en-US/docs/Web/API/FileSystemDirectoryEntry/createReader
    dir.createReader ().readEntries (entries =>

        Promise.all (entries.filter (e => e.name[0] !== '.').map (e =>

            e.isDirectory
                ? filesInDirectory (e)
                : new Promise (resolve => e.file (resolve))
        ))
        .then (files => [].concat (...files))
        .then (resolve)
    )
)

//concat the file names and the last modificed dates so we can detect removal/adding/renaming of files.
const timestampForFilesInDirectory = dir =>
        filesInDirectory (dir).then (files =>
            files.map (f => f.name + f.lastModifiedDate).join ())

const reload = () => {

    // https://developer.chrome.com/extensions/tabs#method-query
    chrome.tabs.query ({ active: true, currentWindow: true }, tabs => { // NB: see https://github.com/xpl/crx-hotreload/issues/5

        // relaod the tab
        // https://developer.chrome.com/extensions/tabs#method-reload
        if (tabs[0]) { chrome.tabs.reload (tabs[0].id) }

        //reload the app
        // this has to happen after the tabs reloads because it stops execution of the script
        // https://developer.chrome.com/apps/runtime#method-reload
        chrome.runtime.reload ()
    })
}

const watchChanges = (dir, lastTimestamp) => {

    timestampForFilesInDirectory (dir).then (timestamp => {

        if (!lastTimestamp || (lastTimestamp === timestamp)) {

            setTimeout (() => watchChanges (dir, timestamp), 1000) // retry after 1s

        } else {

            reload ()
        }
    })

}

// https://developer.chrome.com/extensions/management#method-getSelf
chrome.management.getSelf (self => {
    // https://developer.chrome.com/extensions/management#type-ExtensionInstallType
    if (self.installType === 'development') {
        // https://developer.chrome.com/apps/runtime
        // https://developer.chrome.com/apps/runtime#method-getPackageDirectoryEntry
        // https://developer.chrome.com/native-client/pepper_beta/cpp/classpp_1_1_directory_entry#abd1a4a70ed1b922a232c78be62b1fe86
        chrome.runtime.getPackageDirectoryEntry (dir => watchChanges (dir))
    }
})

// concepts/libraries illustrated in this file:
// recursion
// promises
// chrome apps APIs
// File and Directory Entries API