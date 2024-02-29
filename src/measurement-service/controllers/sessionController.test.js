const sessionController = require('./sessionController');
const sessionService = require('../services/sessionService');

jest.mock('../services/sessionService');

describe('getSessions', () => {
  test('should return all sessions with status code 200', async () => {
    const mockResults = [{ id: 1, name: 'Session 1' }, { id: 2, name: 'Session 2' }];
    sessionService.getAllSessions.mockResolvedValue(mockResults);

    const mockReq = {};
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await sessionController.getSessions(mockReq, mockRes);

    expect(sessionService.getAllSessions).toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockResults);
  });
});

describe('postSession', () => {
    test('should return status code 201 when a session is created', async () => {
        const mockResult = 1;
        sessionService.createSession.mockResolvedValue(mockResult);
    
        const mockReq = { body: {} };
        const mockRes = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
        };
    
        await sessionController.postSession(mockReq, mockRes);
    
        expect(sessionService.createSession).toHaveBeenCalledWith(mockReq.body);
        expect(mockRes.status).toHaveBeenCalledWith(201);
        expect(mockRes.send).toHaveBeenCalledWith(`Session created with ID: ${mockResult}`);
    });
});

describe('terminateSession', () => {
    test('should return status code 200 when a session is terminated', async () => {
        const mockResult = 1;
        sessionService.terminateSession.mockResolvedValue(mockResult);
    
        const mockReq = { query: { id: 1 } };
        const mockRes = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
        };
    
        await sessionController.terminateSession(mockReq, mockRes);
    
        expect(sessionService.terminateSession).toHaveBeenCalledWith(1);
        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.send).toHaveBeenCalledWith(`Session terminated with ID: ${mockResult}`);
    });
});