import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';

@Injectable()
export class ShiftsService {
  private supabase = createClient(
    process.env.SUPABASE_URL as string,
    process.env.SUPABASE_KEY as string,
  );

  // מפקד רואה את כל השמירות
  async getAllShifts() {
    const { data, error } = await this.supabase
      .from('guard_shifts')
      .select('*');

    if (error) return { error: error.message };
    return data;
  }

  // חייל רואה רק את השמירות שלו
  async getShiftsForUser(username: string) {
    const { data, error } = await this.supabase
      .from('guard_shifts')
      .select('*')
      .eq('assigned_to', username);

    if (error) return { error: error.message };
    return data;
  }

  // מפקד יוצר שמירה חדשה
  async createShift(body: { date: string; hour: string; location: string ,assigned_to: string}) {
    const { data, error } = await this.supabase
      .from('guard_shifts')
      .insert([{
        date: body.date,
        hour: body.hour,
        location: body.location,
        assigned_to: body.assigned_to, 
        created_at: new Date().toISOString()
      }]);

    if (error) return { error: error.message };
    return data;
  }
}