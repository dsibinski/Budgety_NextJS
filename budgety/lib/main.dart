import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(App());
}

class App extends StatelessWidget {
  final Future<FirebaseApp> _initialization = Firebase.initializeApp();

  @override
  Widget build(BuildContext context) {
    return FutureBuilder(
      future: _initialization,
      builder: (context, snapshot) {
        if (snapshot.hasError) {
          return UnexpectedError();
        }

        if (snapshot.connectionState == ConnectionState.done) {
          return BudgetyApp();
        }

        // Otherwise, show something whilst waiting for initialization to complete
        return Loading();
      },
    );
  }
}

class BudgetyApp extends StatelessWidget {
  final Future<FirebaseApp> _initialization = Firebase.initializeApp();

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData(
        primaryColor: Colors.lightGreen,
      ),
      home: Scaffold(
        appBar: AppBar(
          title: Text('Budgety'),
        ),
        body: Center(
          child: Text('This is a Budgety app! :)',
              textAlign: TextAlign.center,
              style: TextStyle(color: Colors.lightBlue, fontSize: 20)),
        ),
        floatingActionButton: FloatingActionButton(
          child: Icon(Icons.add),
          onPressed: this.buttonClicked,
        ),
      ),
    );
  }

  void buttonClicked() {
    print("Button clicked func");
  }
}

class UnexpectedError extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        theme: ThemeData(
          primaryColor: Colors.lightGreen,
        ),
        home: Scaffold(
            appBar: AppBar(
              title: Text('Budgety'),
            ),
            body: Center(
              child: Text('Something went wrong... try again later'),
            )));
  }
}

class Loading extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        theme: ThemeData(
          primaryColor: Colors.lightGreen,
        ),
        home: Scaffold(
            appBar: AppBar(
              title: Text('Budgety'),
            ),
            body: Center(
              child: Text('App loading...'),
            )));
  }
}
