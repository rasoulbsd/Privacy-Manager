Set objStdOut = WScript.StdOut
  
  
RunAsAdmin()
Set objwsh = CreateObject("WScript.Shell")

Dim fso
Set fso = WScript.CreateObject("Scripting.Filesystemobject")
Set f = fso.OpenTextFile("C:\Users\Public\Documents\Privacy Manager\Status.txt", 2)
 
f.WriteLine objwsh.RegRead("HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\CapabilityAccessManager\ConsentStore\microphone\Value")
f.Close



Function RunAsAdmin()
 Dim objAPP
  If WScript.Arguments.length = 0 Then
  Set objAPP = CreateObject("Shell.Application")
  objAPP.ShellExecute "wscript.exe", """" & _
  WScript.ScriptFullName & """" & " RunAsAdministrator",,"runas", 1
  WScript.Quit
  End If
End Function