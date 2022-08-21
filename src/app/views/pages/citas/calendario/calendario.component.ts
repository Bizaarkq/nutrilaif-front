import { Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef } from '@angular/core';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';
import { Subject } from 'rxjs';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import { EventColor } from 'calendar-utils';
import { CitaService } from 'src/app/services/cita.service';
import { CitaComponent } from 'src/app/views/components/modal/cita/cita.component';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

const colors: Record<string, EventColor> = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  green: {
    primary: '#8bc34a',
    secondary: '#dcedc8',
  },
};

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css'],
})
export class CalendarioComponent implements OnInit {
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();

  refresh = new Subject<void>();

  events: CalendarEvent[] = [];

  activeDayIsOpen: boolean = false;

  constructor(
    private citaService: CitaService,
    private dialog: MatDialog,
    private datePipe: DatePipe,
    private snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getCitas();
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  getCitas() {
    this.citaService.getCitas().subscribe({
      next: (res) => {
        this.events = res.map((cita: any) => {
          return {
            title: cita.titulo,
            start: new Date(cita.fecha_cita_inicio),
            end: new Date(cita.fecha_cita_fin),
            resizable: {
              beforeStart: true,
              afterEnd: true,
            },
            draggable: true,
            meta: {
              id: cita.id,
              id_paciente: cita.id_paciente,
              nombre: cita.nombre,
              fecha_nacimiento: cita.fecha_nacimiento,
              edad: cita.edad,
              objetivo: cita.objetivo,
              telefono: cita.telefono,
              direccion: cita.direccion,
              correo: cita.correo,
              fecha_cita_inicio: cita.fecha_cita_inicio,
              fecha_cita_fin: cita.fecha_cita_fin,
            },
          };
        });
      },
    });
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    let eventoEdit = {
      ...event,
      start: newStart,
      end: newEnd,
      color: colors['green'],
      meta: {
        ...event.meta,
        fecha_cita_inicio: this.datePipe.transform(
          newStart,
          'yyyy-MM-dd hh:mm:ss'
        ),
        fecha_cita_fin: this.datePipe.transform(
          newEnd,
          'yyyy-MM-dd hh:mm:ss'
        ),
      },
    };
    this.citaService.updateCita(eventoEdit.meta).subscribe({
      next: (res) => {
        this.snack.open(res.mensaje, 'Ok', {
          duration: 3000,
        });
        if(res.code == 200){
          this.events = this.events.map((iEvent) => {
            if (iEvent === event) {
              return eventoEdit;
            }
            return iEvent;
          });
        }
      }
    });
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.openDialog({
      id: event.meta.id,
      id_paciente: event.meta.id_paciente,
      titulo: event.title,
      nombre: event.meta.nombre,
      fecha_nacimiento: event.meta.fecha_nacimiento,
      edad: event.meta.edad,
      objetivo: event.meta.objetivo,
      telefono: event.meta.telefono,
      direccion: event.meta.direccion,
      correo: event.meta.correo,
      fecha_cita_inicio: event.meta.fecha_cita_inicio,
      fecha_cita_fin: event.meta.fecha_cita_fin,
    }); 
  }

  addEvent(): void {
    this.openDialog();
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  openDialog(evento:any = null){
    const dialog = this.dialog.open(CitaComponent, {
      width: '50%',
      data: evento
    });

    dialog.afterClosed().subscribe((result) => {
      if (result) {
        this.events = [
          ...this.events,
          {
            title: result.titulo,
            start: new Date(result.fecha_cita_inicio),
            end: new Date(result.fecha_cita_fin),
            color: colors['green'],
            draggable: true,
            resizable: {
              beforeStart: true,
              afterEnd: true,
            },
            meta: {
              id: result.id,
              id_paciente: result.id_paciente,
              nombre: result.nombre,
              fecha_nacimiento: result.fecha_nacimiento,
              edad: result.edad,
              objetivo: result.objetivo,
              telefono: result.telefono,
              direccion: result.direccion,
              correo: result.correo,
              fecha_cita_inicio: result.fecha_cita_inicio,
              fecha_cita_fin: result.fecha_cita_fin,
            },
          },
        ];
      }
    });
  }
}
