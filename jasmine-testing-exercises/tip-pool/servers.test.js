describe("Servers test (with setup and tear-down)", function() {
    // beforeEach(function() {
    //     // initialization logic
    // });

    it('should add a new server to allServers on submitServerInfo()', function() {
        serverNameInput.value = 'Alice';
        submitServerInfo();

        expect(Object.keys(allServers).length).toEqual(1);
        expect(allServers['server' + serverId].serverName).toEqual('Alice');
        expect(serverNameInput.value).toEqual('');

        allServers = {};
        serverId--;
        serverTbody.removeChild(serverTbody.firstElementChild);
    });
    it('should do nothing/leave allServers array empty if no server name entered', function() {
        submitServerInfo();
        expect(allServers).toEqual({});
    })

    // afterEach(function() {
    //     // teardown logic
    // });
});

describe('updateServerTable() tests', function() {
    it('should fill new tr element with td elements', function() {
        serverNameInput.value = 'Bob';
        // allServers['server1'] = { 'Bob' }; // this doesn't work??
        // ^this follows the same syntax in function submitServerInfo()
        // allServers['server' + serverId] = { serverName };
        submitServerInfo();

        expect(serverTbody.hasChildNodes()).toBeTruthy();
        expect(serverTbody.firstElementChild.hasChildNodes()).toBeTruthy();
        expect(Object.keys(allServers).length).toEqual(1);

        allServers = {};
        serverId--;
        serverTbody.removeChild(serverTbody.firstElementChild);
    });
})